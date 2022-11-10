import React from 'react';
import {Form, Input, Message, Modal, Select} from '@arco-design/web-react';
import {isValidString} from "@/utils/string";
import {StatusCode, StatusMessage} from "@/constant/status";
import {createPhoneNumber} from "@/api/phonebook";

const FormItem = Form.Item;

const PhoneBookModal: React.FC<API.DetailModalProps> = ({visible, callback, hidden}: API.DetailModalProps) => {
    const [form] = Form.useForm();
    const doOk = async () => {
        const type = form.getFieldValue("type");
        const name = form.getFieldValue("name");
        const phone = form.getFieldValue("phone");
        if (!isValidString(name) || !isValidString(phone)) {
            Message.error('部门名称和电话号码不能为空');
            return;
        }
        try {
            const {code}: API.Response = await createPhoneNumber({type, name, phone});
            if (code != StatusCode.OK) {
                Message.error("添加失败!");
                return;
            }
            Message.success("添加成功!");
            callback(null);
        } catch (e) {
            Message.error(StatusMessage.NETWORK_ERROR);
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
                <FormItem label='选择类型' field='type' rules={[{required: true}]}>
                    <Select
                        placeholder='选择电话类型'
                        options={[
                            {
                                label: '部门',
                                value: 'DEPT',
                            },
                            {
                                label: '个人',
                                value: 'PEOPLE',
                            }
                        ]}
                        allowClear
                    />
                </FormItem>
                <FormItem field="name" label='名称' rules={[{required: true}]}>
                    <Input placeholder='请输入名称(所属部门/个人)'/>
                </FormItem>
                <FormItem field="phone" label='电话号码' rules={[{required: true}]}>
                    <Input placeholder='请输入电话号码'/>
                </FormItem>
            </Form>
        </Modal>
    )
}

export default PhoneBookModal;
