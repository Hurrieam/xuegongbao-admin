import React from 'react';
import {Form, Input, Message, Modal} from '@arco-design/web-react';
import {IDetailModalProps, IResponse} from "@/types";
import {isValidString} from "@/utils/string";
import {addPhoneNumber} from "@/api/phonebook";

const FormItem = Form.Item;
const PhoneBookDetail: React.FC<IDetailModalProps> = ({visible, callback, hidden}: IDetailModalProps) => {
    const [form] = Form.useForm();
    const doOk = async () => {
        const deptName = form.getFieldValue("deptName");
        const phone = form.getFieldValue("phone");
        if (!isValidString(deptName) || !isValidString(phone)) {
            Message.error('部门名称和电话号码不能为空');
            return;
        }
        try {
            const {code}: IResponse = await addPhoneNumber({deptName, phone});
            if (code != 10000) {
                Message.error("添加失败!");
                return;
            }
            Message.success("添加成功!");
            callback(null);
        } catch (e) {
            Message.error("网络错误!");
        } finally {
            hidden();
            clearReplyContent();
        }
    }

    const doCancel = () => {
        hidden();
        clearReplyContent();
    }

    const clearReplyContent = () => {
        form.setFieldsValue({deptName: '', phone: ''});
    }

    return (
        <Modal
            title='添加号码'
            visible={visible}
            onOk={doOk}
            onCancel={doCancel}
            autoFocus={false}
            focusLock={true}
        >
            <Form layout="vertical" form={form}>
                <FormItem field="deptName" label='部门名称'>
                    <Input placeholder='请输入部门名称'/>
                </FormItem>
                <FormItem field="phone" label='电话号码'>
                    <Input placeholder='请输入电话号码'/>
                </FormItem>
            </Form>
        </Modal>
    )
}

export default PhoneBookDetail;
