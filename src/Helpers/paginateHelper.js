class PaginatingData {
  static paginateData({ page, limit }) {
    const paginate = {};
    const skip = Number(limit || Number.MAX_SAFE_INTEGER);
    const pages = Number(page || 1);
    const start = Number((pages - 1) * skip);
    const end = page * skip;
    return {
      start, end, pages, skip, paginate,
    };
  }
}

export default PaginatingData;
