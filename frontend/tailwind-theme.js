export default {
    text: {
        outer: 'mb-5 formkit-disabled:opacity-40',
        label: 'block mb-1 font-bold text-sm formkit-invalid:text-red-500',
        inner: `
            border border-gray-200
            rounded-lg
            mb-1
            overflow-hidden
            focus-within:border-gray-600
            formkit-invalid:border-red-500
            `,
        input: "w-full input input-bordered w-full",
        help: 'text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
    },
    email: {
        outer: 'mb-5 formkit-disabled:opacity-40',
        label: 'block mb-1 font-bold text-sm formkit-invalid:text-red-500',
        inner: `
            border border-gray-200
            rounded-lg
            mb-1
            overflow-hidden
            focus-within:border-gray-600
            formkit-invalid:border-red-500
            `,
        input: "w-full input input-bordered w-full",
        help: 'text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs'
    },
    select: {
        outer: 'mb-5 formkit-disabled:opacity-40',
        label: 'block mb-1 font-bold text-sm formkit-invalid:text-red-500',
        inner: `
            border border-gray-200
            rounded-lg
            mb-1
            overflow-hidden
            focus-within:border-gray-600
            formkit-invalid:border-red-500
            `,
        input: " input input-bordered w-full pr-4",
        help: 'text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
        option: 'formkit-multiple:p-3 formkit-multiple:text-sm text-gray-700'
    },
    submit: {
        input: "btn btn-block mt-4 formkit-message:text-red-500",
    },
    form: {
        message: 'text-red-500 mb-1 text-xs'
    }
}