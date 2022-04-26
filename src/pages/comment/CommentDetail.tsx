import React, {Fragment, useEffect, useState} from 'react';
import {Modal, Input, Message, Spin} from '@arco-design/web-react';
import {IDetailModalProps} from "@/types";
import {addComment, changeStatus, getCommentDetails} from "@/api/comment";
import {IComment} from "@/pages/comment/index";
import styles from "./style/index.module.less";
import {formatDate} from "@/utils/date";

const TextArea = Input.TextArea;
const ADMIN_OPENID = "00000000";

function CommentDetail({visible, data: id, callback, hidden}: IDetailModalProps) {
    const [replyContent, setReplyContent] = useState('');
    const [loading, setLoading] = React.useState(false);
    const [comments, setComments] = useState<IComment[]>([]);
    useEffect(() => {
        console.log(id)
        if (!id) return;
        fetchData(id);
    }, [id]);

    const fetchData = async (id: number) => {
        setLoading(true);
        const {code, data} = await getCommentDetails(id);
        if (code != 10000) {
            Message.error("获取留言详情失败!");
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
        const reply: IComment = {
            openid: ADMIN_OPENID,
            content: replyContent,
            parentId: id
        };
        try {
            const {code} = await addComment(reply);
            if (code != 10000) {
                Message.error(`回复留言失败，错误码：${code}`);
                return;
            }
            await changeStatus(id);
            await fetchData(id);
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
                                                    className={styles.reply_time}>{formatDate(item.createdAt).substring(0, 15)}</span>
                                            </div>
                                        ) : (
                                            <div className={styles.reply_item}>
                                                <div className={styles.reply_content}>
                                                    <span>回复: </span>
                                                    <span>{item.content}</span>
                                                </div>
                                                <span
                                                    className={styles.reply_time}>{formatDate(item.createdAt).substring(0, 15)}</span>
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
                placeholder='回复此评论'
                style={{height: '100px'}}
                value={replyContent}
                onChange={(v) => setReplyContent(v)}
            />
        </Modal>
    )
}

export default CommentDetail;