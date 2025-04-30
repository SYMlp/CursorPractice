 // Corresponds to API: GET /data-asset/top-ranking?rankingType={type}&limit={limit}

// Define types based on api_documentation_plan.md and existing data structure
// (Ideally import from api/types.ts)

// Type for: riskResourceData
interface RiskResourceRankingItem {
    id: number;
    name: string;
    value: string; // risk count
    visits: string;
    risks: string; // Seems redundant with value?
  }
  
  // Type for: highRiskUserData
  interface HighRiskUserRankingItem {
    id: number;
    name: string;
    value: string; // data usage?
    visits: string;
    sensitiveResources: string;
    riskCount: string;
  }
  
  // Type for: storageRiskResourceData
  interface StorageRiskRankingItem {
    id: number;
    name: string;
    risk: string[];
    riskTypeCount: string;
    riskCount: string;
    visits: string;
  }
  
  // Type for: lackProtectionResourceData
  interface ProtectionLackRankingItem {
    id: number;
    name: string;
    protection: string;
    visits?: string;
  }
  
  // --- Migrated Data --- 
  
  const riskResourceData: RiskResourceRankingItem[] = [
    { id: 1, name: '人口信息查询', value: '186', visits: '2345', risks: '186' },
    { id: 2, name: '企业信用查询', value: '142', visits: '1986', risks: '142' },
    { id: 3, name: '车辆违章查询', value: '98', visits: '1657', risks: '98' },
    { id: 4, name: '社保缴纳记录查询', value: '65', visits: '1234', risks: '65' },
    { id: 5, name: '公积金账户查询', value: '32', visits: '856', risks: '32' }
  ];
  
  const highRiskUserData: HighRiskUserRankingItem[] = [
    { id: 1, name: '王铭俊', value: '64,565', visits: '10,245', sensitiveResources: '52', riskCount: '325' },
    { id: 2, name: '李欣怡', value: '64,565', visits: '9,876', sensitiveResources: '48', riskCount: '312' },
    { id: 3, name: '张伟翔', value: '64,565', visits: '8,532', sensitiveResources: '42', riskCount: '287' },
    { id: 4, name: '陈诗琪', value: '64,565', visits: '7,621', sensitiveResources: '39', riskCount: '254' },
    { id: 5, name: '刘浩宇', value: '64,565', visits: '6,987', sensitiveResources: '35', riskCount: '221' },
    { id: 6, name: '赵雅芝', value: '55,432', visits: '6,324', sensitiveResources: '31', riskCount: '198' },
    { id: 7, name: '黄建国', value: '48,765', visits: '5,876', sensitiveResources: '28', riskCount: '176' },
    { id: 8, name: '杜鑫宇', value: '42,198', visits: '5,432', sensitiveResources: '26', riskCount: '154' },
    { id: 9, name: '朱婷婷', value: '38,654', visits: '4,987', sensitiveResources: '24', riskCount: '143' },
    { id: 10, name: '邓小平', value: '33,421', visits: '4,567', sensitiveResources: '22', riskCount: '132' },
    { id: 11, name: '郑建华', value: '29,876', visits: '4,123', sensitiveResources: '19', riskCount: '121' },
    { id: 12, name: '马晓丽', value: '26,543', visits: '3,876', sensitiveResources: '18', riskCount: '115' },
    { id: 13, name: '孙宇轩', value: '24,876', visits: '3,542', sensitiveResources: '17', riskCount: '107' },
    { id: 14, name: '林佳慧', value: '22,345', visits: '3,287', sensitiveResources: '16', riskCount: '98' },
    { id: 15, name: '吴孟达', value: '20,876', visits: '3,012', sensitiveResources: '15', riskCount: '92' },
    { id: 16, name: '冯思琪', value: '19,543', visits: '2,845', sensitiveResources: '14', riskCount: '87' },
    { id: 17, name: '钟思颖', value: '18,276', visits: '2,678', sensitiveResources: '13', riskCount: '81' }
  ];
  
  const storageRiskResourceData: StorageRiskRankingItem[] = [
    { 
      "id": 1, 
      "name": "人口信息查询", 
      "risk": ["存储空间不足", "备份文件损坏"],
      "riskTypeCount": "5",
      "riskCount": "186",
      "visits": "23,451"
    },
    { 
      "id": 2, 
      "name": "企业信用查询", 
      "risk": ["磁盘I/O错误", "备份超时"],
      "riskTypeCount": "4",
      "riskCount": "142",
      "visits": "19,872"
    },
    { 
      "id": 3, 
      "name": "车辆违章查询", 
      "risk": ["存储设备故障", "数据冗余不足"],
      "riskTypeCount": "3",
      "riskCount": "98",
      "visits": "16,583"
    },
    { 
      "id": 4, 
      "name": "社保信息查询", 
      "risk": ["存储容量告警", "数据恢复失败"],
      "riskTypeCount": "2",
      "riskCount": "65",
      "visits": "12,347"
    },
    { 
      "id": 5, 
      "name": "公积金查询服务", 
      "risk": ["存储介质老化", "数据碎片化严重"],
      "riskTypeCount": "2",
      "riskCount": "32",
      "visits": "8,569"
    },
    { 
      "id": 6, 
      "name": "医疗保险查询", 
      "risk": ["数据库性能下降", "元数据丢失"],
      "riskTypeCount": "3",
      "riskCount": "28",
      "visits": "7,842"
    },
    { 
      "id": 7, 
      "name": "个人税务服务", 
      "risk": ["数据同步失败", "文件系统错误"],
      "riskTypeCount": "4",
      "riskCount": "25",
      "visits": "7,123"
    },
    { 
      "id": 8, 
      "name": "教育信息查询", 
      "risk": ["存储设备老化", "数据完整性受损"],
      "riskTypeCount": "3",
      "riskCount": "22",
      "visits": "6,542"
    },
    { 
      "id": 9, 
      "name": "银行账户查询", 
      "risk": ["缓存失效", "存储设备故障"],
      "riskTypeCount": "2",
      "riskCount": "19",
      "visits": "5,987"
    },
    { 
      "id": 10, 
      "name": "不动产登记查询", 
      "risk": ["存储资源竞争", "备份任务失败"],
      "riskTypeCount": "3",
      "riskCount": "17",
      "visits": "5,432"
    },
    { 
      "id": 11, 
      "name": "公共交通查询", 
      "risk": ["数据断片", "存储架构老化"],
      "riskTypeCount": "2",
      "riskCount": "15",
      "visits": "4,876"
    },
    { 
      "id": 12, 
      "name": "食品安全监管", 
      "risk": ["存储扩展受限", "数据碎片化"],
      "riskTypeCount": "2",
      "riskCount": "12",
      "visits": "4,321"
    },
    { 
      "id": 13, 
      "name": "居民健康档案", 
      "risk": ["存储空间分配错误", "数据分区故障"],
      "riskTypeCount": "3",
      "riskCount": "10",
      "visits": "3,987"
    },
    { 
      "id": 14, 
      "name": "住房公积金管理", 
      "risk": ["存储节点离线", "数据复制延迟"],
      "riskTypeCount": "2",
      "riskCount": "9",
      "visits": "3,654"
    },
    { 
      "id": 15, 
      "name": "旅游景点预约", 
      "risk": ["存储设备故障", "备份失败"],
      "riskTypeCount": "2",
      "riskCount": "8",
      "visits": "3,321"
    },
    { 
      "id": 16, 
      "name": "电子证照查询", 
      "risk": ["存储容量预警", "数据一致性问题"],
      "riskTypeCount": "3",
      "riskCount": "7",
      "visits": "2,987"
    },
    { 
      "id": 17, 
      "name": "交通违章处理", 
      "risk": ["数据丢失风险", "存储性能瓶颈"],
      "riskTypeCount": "2",
      "riskCount": "6",
      "visits": "2,654"
    }
  ];
  
  const lackProtectionResourceData: ProtectionLackRankingItem[] = [
    { id: 1, name: '人口信息查询系统', protection: '权限管控, 多维认证', visits: '23,451' },
    { id: 2, name: '企业信用公示平台', protection: '权限管控', visits: '19,872' },
    { id: 3, name: '车辆违章查询服务', protection: 'IDS, IPS', visits: '16,583' },
    { id: 4, name: '社保信息查询系统', protection: '防病毒, 权限管理', visits: '12,347' },
    { id: 5, name: '公积金查询服务', protection: '权限管控', visits: '8,569' },
    { id: 6, name: '医疗保险查询系统', protection: '数据库加密, 日志审计', visits: '7,842' },
    { id: 7, name: '个人税务服务平台', protection: '入侵检测, 应用防火墙', visits: '7,123' },
    { id: 8, name: '教育信息查询系统', protection: '安全网关, 漏洞扫描', visits: '6,542' },
    { id: 9, name: '银行账户查询系统', protection: '数据脱敏, 访问控制', visits: '5,987' },
    { id: 10, name: '不动产登记查询系统', protection: '网络隔离, 安全审计', visits: '5,432' },
    { id: 11, name: '公共交通查询系统', protection: '病毒防护, 权限管理', visits: '4,876' },
    { id: 12, name: '食品安全监管平台', protection: '数据备份, 日志监控', visits: '4,321' },
    { id: 13, name: '居民健康档案系统', protection: '数据加密, 访问控制', visits: '3,987' },
    { id: 14, name: '住房公积金管理系统', protection: '防火墙, 入侵检测', visits: '3,654' },
    { id: 15, name: '旅游景点预约系统', protection: '日志审计, 数据脱敏', visits: '3,321' },
    { id: 16, name: '电子证照查询系统', protection: '安全网关, 多因素认证', visits: '2,987' },
    { id: 17, name: '交通违章处理系统', protection: '应用防火墙, 漏洞扫描', visits: '2,654' }
  ];
  
  // --- Mock Function --- 
  
  export const getDataAssetTopRankingMock = (
      rankingType: 'riskResource' | 'highRiskUser' | 'storageRisk' | 'protectionLack' | string,
      limit?: number
  ): Promise<any[]> => { // Return type is any[] for simplicity, ideally a union of specific types
      console.log(`Mock Fetching dataAsset top ranking for type: ${rankingType}, limit: ${limit}`);
  
      let data: any[] = [];
  
      switch (rankingType) {
          case 'riskResource':
              data = riskResourceData;
              break;
          case 'highRiskUser':
              data = highRiskUserData;
              break;
          case 'storageRisk':
              data = storageRiskResourceData;
              break;
          case 'protectionLack':
              data = lackProtectionResourceData;
              break;
          default:
              console.warn(`Unknown rankingType: ${rankingType}. Returning empty array.`);
              data = [];
      }
  
      if (limit !== undefined && limit > 0) {
          data = data.slice(0, limit);
      }
  
      return Promise.resolve(data);
  };