import React, {useEffect, useState} from 'react';
import {Descriptions, Message, Modal, Spin} from '@arco-design/web-react';
import {StatusCode, StatusMessage} from "@/constant/status";
import {findEvalDetail} from "@/api/canteen-eval";

interface IEvalDetail {
    question: string;
    rate: string;
}

function EvalModal({visible, data: id, hidden}: API.DetailModalProps) {
    const [data, setData] = useState<any[]>();
    const [ratings, setRatings] = useState<any[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id: number) => {
        if (!id) return;
        setLoading(true);
        const {code, data} = await findEvalDetail(id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.FETCH_DATA_ERROR);
            return;
        }
        setData(data);
        console.log(data)
        parseData(data.ratings)
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };
    const parseData = (content: string) => {
        let res = [];
        try {
            const arr = JSON.parse(content);
            arr.forEach((item: IEvalDetail) => {
                res.push({
                    title: item.question,
                    content: [
                        {
                            label: "评分",
                            value: item.rate + "分",
                        },
                        // {
                        //     label: "补充说明",
                        //     value: item.explain || "无",
                        // }
                    ]
                });
            });
        } catch (e) {
            res = [];
        } finally {
            setRatings(res);
        }
    }

    return (
        <Modal
            title='详细信息'
            onCancel={hidden}
            visible={visible}
            footer={null}
            style={{width: 700, height: "80vh", overflowY: "auto"}}
        >
            <Spin loading={loading} style={{width: "100%"}}>
                {
                    ratings && ratings.map((item: any, index: number) => {
                        return (
                            <Descriptions
                                border
                                column={2}
                                title={(index + 1) + ". " + item.title}
                                data={item.content}
                                key={index}
                                style={{marginBottom: 20}}
                            />
                        )
                    })
                }
            </Spin>

        </Modal>
    )
}

export default EvalModal;