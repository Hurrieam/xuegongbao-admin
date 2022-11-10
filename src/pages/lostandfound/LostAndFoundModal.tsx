import React, {useEffect, useMemo, useState} from 'react';
import {Descriptions, Image, Message, Modal, Space, Spin, Tag} from '@arco-design/web-react';
import {isValidString} from "@/utils/string";
import {StatusCode, StatusMessage} from "@/constant/status";
import {findLafItem} from "@/api/lostandfound";
import {formatDate} from "@/utils/date";

const LostAndFoundModal: React.FC<API.DetailModalProps> = ({visible, data: id, hidden}: API.DetailModalProps) => {
    const [data, setData] = useState<API.LostAndFound>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id: number) => {
        if (!id) return;
        setLoading(true);
        const {code, data} = await findLafItem(id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.FETCH_DATA_ERROR);
            return;
        }
        setData(data);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const doCancel = () => {
        hidden();
    }

    const imageMemo = useMemo(
        (): string[] => {
            if (!id) return [];
            let images = [];
            try {
                images = JSON.parse(data.images);
                images = images.map(url => "https://" + url);
            } catch (e) {
                return [];
            }
            console.log(images)
            return images;
        }, [id]
    );

    // const getRows = (data: API.LostAndFound) => {
    const getRows = (data: any) => {
        if (!data) return [];
        return [{
            label: '标题',
            value: data.title
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
            value: data.owner ? `${data.owner?.stuName} (${data.owner?.stuId})` : ""
        }, {
            label: '联系方式',
            value: `[${data.contactMethod}] ${data.contactNumber}`
        }, {
            label: '当前状态',
            value: data.status ? (<Tag color="#00b42a">已找到</Tag>) : (<Tag color="#f53f3f">未找到</Tag>)
        },{
            label: '发布时间',
            value: formatDate(data.created_at)
        }];
    }
    return (
        <Modal
            title='详细信息'
            visible={visible}
            onCancel={doCancel}
            autoFocus={false}
            focusLock={true}
            footer={null}
        >
            <Spin loading={loading} style={{width: "100%"}}>
                <Descriptions
                    column={1}
                    data={getRows(data)}
                    style={{marginBottom: 20}}
                    labelStyle={{paddingRight: 36}}
                />
            </Spin>
        </Modal>
    )
}

export default LostAndFoundModal;