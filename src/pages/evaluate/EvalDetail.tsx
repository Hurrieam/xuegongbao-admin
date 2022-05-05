import React, {useEffect} from 'react';
import {Descriptions, Modal} from '@arco-design/web-react';

interface IEvalDetail {
    question: string;
    score: string;
    explain: string;
}

function EvalDetail({visible, data,  hidden}: API.DetailModalProps) {
    const [details, setDetails] = React.useState<any[]>();
    useEffect(() => {
        if (!data) return;
        parseData(data.content);
    }, [data]);

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
                            value: item.score + "分",
                        },
                        {
                            label: "补充说明",
                            value: item.explain || "无",
                        }
                    ]
                });
            });
        } catch (e) {
            res = [];
        } finally {
            setDetails(res);
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
            {
                details && details.map((item: any, index: number) => {
                    return (
                        <Descriptions
                            border
                            column={1}
                            title={(index + 1) + ". " + item.title}
                            data={item.content}
                            key={index}
                            style={{marginBottom: 20}}
                        />
                    )
                })
            }

        </Modal>
    )
}

export default EvalDetail;