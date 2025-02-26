const _array = {
    chunks: (array: any[], size: number) => {
        return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
            array.slice(i * size, i * size + size)
        );
    }
}


export default _array;