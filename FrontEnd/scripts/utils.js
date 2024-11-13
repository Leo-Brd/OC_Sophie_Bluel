
export function uniqueWorks(works) {
    const seenIds = new Set();

    return works.filter(work => {
        if (seenIds.has(work.id)) {
            return false;
        }
        seenIds.add(work.id);
        return true;
    });
}
