"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmcBatchExchangeRepo = void 0;
function cmcBatchExchangeRepo(service, idMapper, respMapper) {
    return {
        getBatchedRate: (currencies) => service
            .getBatchedRate(idMapper.fromDomainList(currencies))
            .then(respMapper.toDomain),
    };
}
exports.cmcBatchExchangeRepo = cmcBatchExchangeRepo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ01DQmF0Y2hFeGNoYW5nZVJlcG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQ01DQmF0Y2hFeGNoYW5nZVJlcG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsU0FBZ0Isb0JBQW9CLENBQ2hDLE9BQTBDLEVBQzFDLFFBQTJCLEVBQzNCLFVBQTBDO0lBRTFDLE9BQU87UUFDSCxjQUFjLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUMzQixPQUFPO2FBQ0YsY0FBYyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7S0FDckMsQ0FBQztBQUNOLENBQUM7QUFYRCxvREFXQyJ9