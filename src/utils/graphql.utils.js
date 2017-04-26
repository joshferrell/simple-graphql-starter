
const getSchemaValues = (accumulator, { name, type, description }) => {
    accumulator[name] = {
        type,
        description
    };
    return accumulator;
};

export const getInputFields = fields =>
    fields
        .filter(field => field.isInput)
        .reduce((accumulator, field) => getSchemaValues(accumulator, field), {});

export const getOutputFields = fields =>
    fields
        .filter(field => field.isOutput)
        .reduce((accumulator, field) => getSchemaValues(accumulator, field), {});
