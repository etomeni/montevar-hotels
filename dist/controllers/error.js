export const get404 = (req, res, next) => {
    return res.status(404).json({
        status: false,
        statusCode: 404,
        message: 'Endpoint url resource Not Found.'
    });
};
export const get500 = (error, req, res, next) => {
    // const data = error.data;
    return res.status(error.statusCode || 500).json({
        error: {
            message: error.message,
            data: error.data
        }
    });
};
