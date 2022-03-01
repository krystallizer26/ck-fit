export function calculatePagination(pageNum: number, pageSize: number, maxCount: number) {
  let paginate = {
    pageNum: pageNum,
    pageSize: pageSize,
    pageMax: Math.ceil(maxCount / pageSize),
  };

  return paginate;
}
