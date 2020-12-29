const Path = require('path')
require('express-async-errors')

const { ResourceNotFoundError } = require('./Handlers/ErrorHandler/errorsBearer')
const { error } = require('./middlewares/error');

const userRoutes = require('./Routes/user.routes');
const postsRoutes = require('./Routes/post.routes');
const commentsRoutes = require('./Routes/comment.routes');
const tagsRoutes = require('./Routes/tag.routes');
const repliesRoutes = require('./Routes/reply.routes');
const notificationRoutes = require('./Routes/notification.routes');


const app = require('./Config/Server');


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/tags', tagsRoutes);
app.use('/api/v1/comments', commentsRoutes);
app.use('/api/v1/reply', repliesRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.get('/*', function (req, res) {
    res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'");
    res.sendFile(Path.join(__dirname, 'client', 'dist', 'task1', 'index.html'));
});

// for invalid and non existing routes
app.all('*', (req, res) => {
    throw new ResourceNotFoundError()
});

// Error middleware handler
app.use(error)
