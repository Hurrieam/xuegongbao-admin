import React, {Fragment, useEffect, useState} from 'react';
import {Input, Message, Modal, Spin} from '@arco-design/web-react';
import styles from "./style/index.module.less";
import {formatDate} from "@/utils/date";
import {StatusCode, StatusMessage} from "@/constant/status";
import {createMessage, findMessageDetail, updateMessageStatus} from "@/api/message";

const TextArea = Input.TextArea;

function MessageModal({visible, data: id, callback, hidden}: API.DetailModalProps) {
    const [replyContent, setReplyContent] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState<API.Message[]>([]);
    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = async (id: number) => {
        if (!id) return;
        setLoading(true);
        const {code, data} = await findMessageDetail(id);
        if (code != StatusCode.OK) {
            Message.error(StatusMessage.FETCH_DATA_ERROR);
            return;
        }
        setComments(data.items);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    const doOk = async () => {
        if (replyContent.length === 0) {
            Message.error("请输入回复内容");
            return;
        }
        const reply: API.Message = {
            content: replyContent,
            parentId: id,
            isReply: true
        };
        try {
            const {code}: API.Response = await createMessage(reply);
            if (code != StatusCode.OK) {
                Message.error(`回复留言失败，错误码：${code}`);
                return;
            }
            await updateMessageStatus(id);
            await fetchData(id);
            callback(id);
            Message.success('回复成功!');
        } catch (e) {
            Message.error(`回复留言失败，错误信息：${e.message}`);
        } finally {
            clearReplyContent();
        }
    }

    const doCancel = () => {
        clearReplyContent();
        hidden();
    }

    const clearReplyContent = () => {
        setReplyContent('');
    }
    return (
        <Modal
            title='详细信息'
            visible={visible}
            onOk={doOk}
            onCancel={doCancel}
            autoFocus={true}
            focusLock={true}
            maskClosable={false}
        >
            <Spin loading={loading} style={{width: "100%"}}>
                <div className={styles.reply_wrapper}>
                    {
                        comments.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    {
                                        !item.isReply ? (
                                            <div className={styles.comment_item}>
                                                <span className={styles.comment_content}>{item.content}</span>
                                                <span
                                                    className={styles.reply_time}>{formatDate(item.createdAt)}</span>
                                            </div>
                                        ) : (
                                            <div className={styles.reply_item}>
                                                <div className={styles.reply_content}>
                                                    <span>回复: </span>
                                                    <span>{item.content}</span>
                                                </div>
                                                <span
                                                    className={styles.reply_time}>{formatDate(item.createdAt)}</span>
                                            </div>
                                        )
                                    }
                                </Fragment>
                            )
                        })
                    }
                </div>
            </Spin>
            <TextArea
                placeholder='请输入回复内容'
                style={{height: '100px'}}
                value={replyContent}
                onChange={(v) => setReplyContent(v)}
            />
        </Modal>
    )
}

export default MessageModal;