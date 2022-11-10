import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  primaryColor: '#1890ff',
  navTheme: 'dark',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '模型开发平台',
  pwa: false,
  logo: '/model-dev-platform/logo.png',
  iconfontUrl: '',
};

export default Settings;
