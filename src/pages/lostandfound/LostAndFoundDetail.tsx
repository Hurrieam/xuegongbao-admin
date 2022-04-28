import React, {useEffect, useMemo, useState} from 'react';
import {Descriptions, Modal, Space, Tag, Image} from '@arco-design/web-react';
import {IDetailModalProps} from "@/types";
import {ILostAndFound} from "@/pages/lostandfound/index";
import {isValidString} from "@/utils/string";

const LostAndFoundDetail: React.FC<IDetailModalProps> = ({visible, data, hidden}: IDetailModalProps) => {
    useEffect(() => {
        if (!data) return;
    }, [data]);

    const doOk = () => {
        console.log(imageMemo);
        // hidden();
    };

    const doCancel = () => {
        hidden();
    }

    const imageMemo = useMemo(
        (): string[] => {
            if (!data) return [];
            let images = [];
            try {
                images = JSON.parse(data.images).map((item: string) => {
                    return item;
                });
            } catch (e) {
                return [];
            }
            return images;
        }, [data]
    );

    const getRows = (data: ILostAndFound) => {
        if (!data) return [];
        return [{
            label: '物品名称',
            value: data.itemName
        }, {
            label: '丢失地址',
            value: isValidString(data.location) ? data.location : '未知'
        }, {
            label: '丢失时间',
            value: isValidString(data.lostTime) ? data.lostTime : '未知'
        }, {
            label: '描述信息',
            value: data.description
        }, {
            label: '图片',
            value: (
                imageMemo.length > 0 ? (
                    <Image.PreviewGroup>
                        <Space wrap={true}>
                            {imageMemo.map((src, index) =>
                                <Image key={index} src={src} width={100} alt={`${data.id} : ${index + 1}`}/>)}
                        </Space>
                    </Image.PreviewGroup>
                ) : (
                    <span>无</span>
                )
            )
        }, {
            label: '学生姓名',
            value: isValidString(data.stuName) ? data.stuName : '***'
        }, {
            label: '联系方式',
            value: data.contact
        }, {
            label: '当前状态',
            value: data.status ? (<Tag color="#00b42a">已找到</Tag>) : (<Tag color="#f53f3f">未找到</Tag>)
        }];
    }
    return (
        <Modal
            title='详细信息'
            visible={visible}
            onOk={doOk}
            onCancel={doCancel}
            autoFocus={false}
            focusLock={true}
            footer={null}
        >
            <Descriptions
                column={1}
                title='基本信息'
                data={getRows(data)}
                style={{marginBottom: 20}}
                labelStyle={{paddingRight: 36}}
            />
        </Modal>
    )
}

export default LostAndFoundDetail;