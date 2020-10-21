import dotenv from 'dotenv';
dotenv.config();

const connectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.l7cfd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority
`;
export default connectionURL;
