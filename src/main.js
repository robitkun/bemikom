import { app } from './application/web.js';
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.info('App Start');
});
