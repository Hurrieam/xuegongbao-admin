import React, {useEffect, useState} from 'react';
import {Modal, Input, Message} from '@arco-design/web-react';
import {IDetailModalProps} from "@/types";
import {addComment, changeStatus} from "@/api/comment";
import {IComment} from "@/pages/comment/index";

const TextArea = Input.TextArea;

function CommentDetail({visible, data, callback, hidden}: IDetailModalProps) {
    const [replyContent, setReplyContent] = useState('');
    useEffect(() => {
        if (!data?.id) return;
    }, [data]);

    const doOk = async () => {
        if (replyContent.length === 0) {
            Message.error("请输入回复内容");
            return;
        }
        const reply: IComment = {
            openid: '00000000',
            content: replyContent,
            time: new Date().toLocaleDateString(),
            parentId: data.id
        };
        try {
            const {code} = await addComment(reply);
            if (code != 10000) {
                Message.error(`回复留言失败，错误码：${code}`);
                return;
            }
            await changeStatus(data.id);
            callback({...data, hasReply: true});
            Message.success('回复成功!');
        } catch (e) {
            Message.error(`回复留言失败，错误信息：${e.message}`);
        } finally {
            clearReplyContent();
            hidden();
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
            autoFocus={false}
            focusLock={true}
        >
            <p>{data?.content}</p>
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