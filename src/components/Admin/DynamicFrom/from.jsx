import React from 'react'
import {
    Button,
    Form,
    Input,
    Upload,
    Select,

} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const DynamicFrom = ({ form, onFinish, fields, submitText = "Submit", }) => {



    return (
        <div>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 22 }}
                layout="horizontal"
                style={{ maxWidth: 700 }}
                className=''
                onFinish={onFinish}
            >
                {fields.map((field) => {
                    const { name, label, rules } = field;
                    const commonProps = { label, name, rules };

                    switch (field.type) {
                        case 'input':
                            return (
                                <Form.Item key={name} {...commonProps}>
                                    <Input />
                                </Form.Item>
                            );

                        case 'textarea':
                            return (
                                <Form.Item key={name} {...commonProps}>
                                    <TextArea rows={field.rows || 4} />
                                </Form.Item>
                            );

                        case 'select':
                            return (
                                <Form.Item key={name} {...commonProps}>
                                    <Select>
                                        {field.options?.map((opt, index) => (
                                            <Select.Option key={index} value={opt._id}>
                                                {opt.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            );

                        case 'upload':
                            return (
                                <Form.Item
                                    key={name}
                                    {...commonProps}
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                                >
                                    <Upload
                                        listType="picture-card"
                                        multiple
                                        maxCount={4}
                                        fileList={form.getFieldValue(name) || []}
                                        beforeUpload={() => false}
                                        onChange={(info) => {
                                            const newFileList = info.fileList.map(file => {
                                                if (!file.originFileObj && file instanceof File) {
                                                    file.originFileObj = file;
                                                }

                                                if (!file.url && !file.preview && file.originFileObj) {
                                                    const previewUrl = URL.createObjectURL(file.originFileObj);
                                                    file.preview = previewUrl;
                                                    file.thumbUrl = previewUrl;
                                                }

                                                return {
                                                    ...file,
                                                    status: 'done',
                                                };
                                            });

                                            form.setFieldsValue({
                                                [name]: newFileList,
                                            });
                                        }}
                                    >
                                        {(form.getFieldValue(name) || []).length >= 4 ? null : (
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        )}
                                    </Upload>
                                </Form.Item>
                            );

                        default:
                            return null;
                    }
                })}



                <Form.Item className='flex justify-center mt-10'>
                    <Button type="primary" htmlType="submit" >
                        {submitText}
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default DynamicFrom