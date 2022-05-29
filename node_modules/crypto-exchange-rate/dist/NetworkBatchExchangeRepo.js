"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkBatchExchangeRateRepo = void 0;
function networkBatchExchangeRateRepo(service, mapper) {
    return {
        getBatchedRate: (v) => service.getBatchedRate(v).then(mapper.toDomain),
    };
}
exports.networkBatchExchangeRateRepo = networkBatchExchangeRateRepo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV0d29ya0JhdGNoRXhjaGFuZ2VSZXBvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL05ldHdvcmtCYXRjaEV4Y2hhbmdlUmVwby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxTQUFnQiw0QkFBNEIsQ0FDeEMsT0FBOEMsRUFDOUMsTUFBMEM7SUFFMUMsT0FBTztRQUNILGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUN6RSxDQUFDO0FBQ04sQ0FBQztBQVBELG9FQU9DIn0=