import {Form, Input, Checkbox, Button, Space} from '@arco-design/web-react';
import {FormInstance} from '@arco-design/web-react/es/Form';
import {IconLock, IconUser} from '@arco-design/web-react/icon';
import {defaultRoute} from '@/routes';
import React, {useEffect, useRef, useState} from 'react';
import styles from './style/index.module.less';
import {login} from "@/api/login";
import {IResponse} from "@/types";
import {StatusCode} from "@/constant/status";
import {aesDecrypt, aesEncrypt} from "@/utils/encrypto";
import {keys} from "@/constant/keys";

export interface ILoginForm {
    username: string;
    password: string;
}

export default function LoginForm() {
    const formRef = useRef<FormInstance>();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(false);

    function afterLoginSuccess(params) {
        // 记住密码
        if (rememberPassword) {
            localStorage.setItem(keys.REMEMBER_ME, aesEncrypt(JSON.stringify(params)));
        } else {
            localStorage.removeItem(keys.REMEMBER_ME);
        }
        // 记录登录状态
        localStorage.setItem(keys.USER_STATUS, 'login');
        // 跳转首页
        window.location.href = defaultRoute;
    }

    const doLogin = async (params: ILoginForm) => {
        setErrorMessage('');
        setLoading(true);
        const {code}: IResponse = await login(params)
        console.log(code);
        if (code == StatusCode.PASSWORD_ERROR) {
            setErrorMessage("用户名或密码错误!");
        } else if (code == StatusCode.ACCOUNT_DISABLED) {
            setErrorMessage("账号已被禁用!");
        } else if (code == StatusCode.OK) {
            afterLoginSuccess(params);
        } else {
            setErrorMessage("未知错误!");
        }
        setLoading(false);
    }

    const onSubmitClick = async () => {
        const params: ILoginForm = await formRef.current.validate();
        console.log(params);
        await doLogin({
            username: params.username,
            password: params.password
        });
    }

    // 读取 localStorage，设置初始值
    useEffect(() => {
        const params = localStorage.getItem(keys.REMEMBER_ME);
        const rememberPassword = !!params;
        setRememberPassword(rememberPassword);
        if (formRef.current && rememberPassword) {
            const parseParams = JSON.parse(aesDecrypt(params));
            formRef.current.setFieldsValue(parseParams);
        }
    }, []);

    return (
        <div className={styles['login-form-wrapper']}>
            <div className={styles['login-form-title']}>学工宝后台管理系统</div>
            <div className={styles['login-form-error-msg']}>{errorMessage}</div>
            <Form
                className={styles['login-form']}
                layout="vertical"
                ref={formRef}
            >
                <Form.Item field="username" rules={[{required: true, message: '用户名不能为空'}]}>
                    <Input
                        prefix={<IconUser/>}
                        placeholder="用户名"
                        onPressEnter={onSubmitClick}
                    />
                </Form.Item>
                <Form.Item field="password" rules={[{required: true, message: '密码不能为空'}]}>
                    <Input.Password
                        prefix={<IconLock/>}
                        placeholder="密码"
                        onPressEnter={onSubmitClick}
                    />
                </Form.Item>
                <Space size={16} direction="vertical">
                    <div className={styles['login-form-password-actions']}>
                        <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
                            记住密码
                        </Checkbox>
                    </div>
                    <Button type="primary" long onClick={onSubmitClick} loading={loading}>
                        登录
                    </Button>
                </Space>
            </Form>
        </div>
    );
}
