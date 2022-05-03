import React, {Fragment, useEffect, useState} from 'react';
import {Input, Message, Modal, Spin} from '@arco-design/web-react';
import styles from "./style/index.module.less";
import {formatDate} from "@/utils/date";
import {addComment, getCommentDetailsById, updateCommentStatusById} from "@/api/comment";
import {StatusCode, StatusMessage} from "@/constant/status";

const TextArea = Input.TextArea;
const ADMIN_OPENID = "00000000";

function CommentDetail({visible, data: id, callback, hidden}: API.DetailModalProps) {
    const [replyContent, setReplyContent] = useState<string>('');
    const [loading, setLoading] = React.useState(false);
    const [comments, setComments] = useState<API.Comment[]>([]);
    useEffect(() => {
        if (!id) return;
        fetchData(id);
    }, [id]);

    const fetchData = async (id: number) => {
        setLoading(true);
        const {code, data} = await getCommentDetailsById(id);
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
        const reply: API.Comment = {
            openid: ADMIN_OPENID,
            content: replyContent,
            parentId: id
        };
        try {
            const {code}: API.Response = await addComment(reply);
            if (code != StatusCode.OK) {
                Message.error(`回复留言失败，错误码：${code}`);
                return;
            }
            await updateCommentStatusById(id);
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
                                        item.openid != ADMIN_OPENID ? (
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

export default CommentDetail;