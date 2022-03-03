export function calculatePagination(pageNum: number, pageSize: number, maxCount: number) {
  let paginate = {
    maxCount: maxCount,
    pageNum: pageNum,
    pageSize: pageSize,
    pageMax: Math.ceil(maxCount / pageSize),
  };

  return paginate;
}
