import { getInputFields, getOutputFields } from './graphql.utils';

const testSchema = [
    {
        name: 'id',
        type: 'id',
        description: 'The UUID of the account',
        isInput: false,
        isOutput: true
    },
    {
        name: 'email',
        type: 'string',
        description: 'The email of the account, must be unique',
        isInput: true,
        isOutput: true
    },
    {
        name: 'password',
        type: 'string',
        description: 'Login password of the account',
        isInput: true,
        isOutput: false
    }
];

describe('graph-ql utilities', () => {
    it('should filter out input fields', () =>
        expect(getInputFields(testSchema)).toMatchSnapshot()
    );

    it('should filter out output fields', () =>
        expect(getOutputFields(testSchema)).toMatchSnapshot()
    );

    it('should only return required graphql values', () => {
        const output = getOutputFields(testSchema);
        return expect(output).toMatchObject({
            id: {
                type: 'id',
                description: 'The UUID of the account'
            },
            email: {
                type: 'string',
                description: 'The email of the account, must be unique'
            }
        });
    });
});
