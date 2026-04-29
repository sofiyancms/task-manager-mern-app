const notFound = (req,res,next) => {
    const err = new Error("Page /Resource does not exist");
    err.status = 404;
    next(err);
};

export default notFound;