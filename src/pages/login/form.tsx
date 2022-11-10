import {Button, Checkbox, Form, Input, Space} from '@arco-design/web-react';
import {FormInstance} from '@arco-design/web-react/es/Form';
import {IconLock, IconUser} from '@arco-design/web-react/icon';
import {defaultRoute} from '@/routes';
import React, {useEffect, useRef, useState} from 'react';
import styles from './style/index.module.less';
import {login} from "@/api/login";
import {StatusCode, StatusMessage} from "@/constant/status";
import {aesDecrypt, aesEncrypt} from "@/utils/encryptor";
import {StorageKey} from "@/constant/keys";
import storage from "@/utils/storage";


export default function LoginForm() {
    const formRef = useRef<FormInstance>();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [rememberPassword, setRememberPassword] = useState<boolean>(false);

    // 读取 localStorage 设置初始值
    useEffect(() => {
        const params = storage.getItem(StorageKey.REMEMBER_ME);
        const rememberPassword = !!params;
        setRememberPassword(rememberPassword);
        if (formRef.current && rememberPassword) {
            try {
                const parseParams = JSON.parse(aesDecrypt(params));
                formRef.current.setFieldsValue(parseParams);
            } catch (e) {
                formRef.current.setFieldsValue({
                    username: '',
                    password: ''
                });
            }
        }
    }, []);

    const afterLoginSuccess = (params: API.LoginForm, token: string) => {
        // 存储token
        storage.setItem(StorageKey.USER_TOKEN, token);
        // 记住密码
        if (rememberPassword) {
            storage.setItem(StorageKey.REMEMBER_ME, aesEncrypt(JSON.stringify(params)));
        } else {
            storage.removeItem(StorageKey.REMEMBER_ME);
        }
        // 记住用户名
        storage.setItem(StorageKey.USER_ACCOUNT, params.username);
        // 记录登录状态
        storage.setItem(StorageKey.USER_STATUS, 'login');
        // 跳转首页
        window.location.href = defaultRoute;
    }

    const doLogin = async (params: API.LoginForm) => {
        setErrorMessage('');
        setLoading(true);
        const res: API.Response = await login(params)
        if (!res) {
            setLoading(false);
            return;
        }
        const {code, data} = res;
        switch (code) {
            case StatusCode.PASSWORD_ERROR:
                setErrorMessage(StatusMessage.PASSWORD_ERROR);
                break;
            case StatusCode.ACCOUNT_DISABLED:
                setErrorMessage(StatusMessage.ACCOUNT_DISABLED);
                break;
            case StatusCode.OK:
                afterLoginSuccess(params, data.token);
                break;
            default:
                setErrorMessage(StatusMessage.UNKNOWN_ERROR);
                break;
        }
        setLoading(false);
    }

    const onSubmitClick = async () => {
        const params: API.LoginForm = await formRef.current.validate();
        await doLogin({
            username: params.username,
            password: params.password
        });
    }

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
