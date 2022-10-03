import app from './app';
import { APP_PORT } from './app/app.config'

app.listen(APP_PORT, () => {
  console.log('服务已运行在30001;')
});