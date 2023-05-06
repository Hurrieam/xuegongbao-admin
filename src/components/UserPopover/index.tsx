import {Descriptions, Link, Popover} from "@arco-design/web-react";
import React from "react";

interface Props {
    user: User;
}

const UserPopover: React.FC<Props> = ({user}) => {
    if (!user?.stuName) {
        return <span>***</span>
    }
    return (
        <Popover
            content={
                <Descriptions colon=' :' column={1} title='学生信息' data={[
                    {
                        label: '姓名',
                        value: user.stuName || '***'
                    }, {
                        label: '学号',
                        value: user.stuId || '***'
                    }, {
                        label: '班级',
                        value: user.stuClass || '***'
                    }
                ]}/>
            }
        >
            <Link hoverable={false}>{user.stuName}</Link>
        </Popover>
    )
}

export default UserPopover;