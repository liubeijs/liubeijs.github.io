const provinceDepartments = {
    "北京市": {
        "发改部门": "https://fgw.beijing.gov.cn",
        "交通部门": "https://jtw.beijing.gov.cn",
        "住建部门": "https://zjw.beijing.gov.cn",
        "水利部门": "https://swj.beijing.gov.cn",
        "自然资源": "https://ghzrzyw.beijing.gov.cn"
    },
    "上海市": {
        "发改部门": "https://fgw.sh.gov.cn",
        "交通部门": "https://jtw.sh.gov.cn",
        "住建部门": "https://zjw.sh.gov.cn",
        "水利部门": "https://swj.sh.gov.cn",
        "自然资源": "https://ghzyj.sh.gov.cn"
    },
    "天津市": {
        "发改部门": "https://fzgg.tj.gov.cn",
        "交通部门": "https://jtys.tj.gov.cn",
        "住建部门": "https://zfcxjs.tj.gov.cn",
        "水利部门": "https://swj.tj.gov.cn",
        "自然资源": "https://ghhzrzy.tj.gov.cn"
    },
    "重庆市": {
        "发改部门": "https://fzggw.cq.gov.cn",
        "交通部门": "https://jtj.cq.gov.cn",
        "住建部门": "https://zfcxjw.cq.gov.cn",
        "水利部门": "https://slj.cq.gov.cn",
        "自然资源": "http://ghzrzyj.cq.gov.cn"
    },
    "河北省": {
        "发改部门": "https://hbdrc.hebei.gov.cn",
        "交通部门": "https://jtt.hebei.gov.cn/zwgk",
        "住建部门": "https://zfcxjst.hebei.gov.cn",
        "水利部门": "http://slt.hebei.gov.cn",
        "自然资源": "https://zrzy.hebei.gov.cn"
    },
    "山西省": {
        "发改部门": "https://fgw.shanxi.gov.cn",
        "交通部门": "https://jtyst.shanxi.gov.cn",
        "住建部门": "https://zjt.shanxi.gov.cn",
        "水利部门": "https://slt.shanxi.gov.cn",
        "自然资源": "http://zrzyt.shanxi.gov.cn"
    },
    "内蒙古自治区": {
        "发改部门": "https://fgw.nmg.gov.cn",
        "交通部门": "https://jtyst.nmg.gov.cn",
        "住建部门": "https://zjt.nmg.gov.cn",
        "水利部门": "https://slt.nmg.gov.cn",
        "自然资源": "https://zrzy.nmg.gov.cn"
    },
    "辽宁省": {
        "发改部门": "https://fgw.ln.gov.cn",
        "交通部门": "https://jtt.ln.gov.cn",
        "住建部门": "https://zjt.ln.gov.cn",
        "水利部门": "https://slt.ln.gov.cn",
        "自然资源": "https://zrzy.ln.gov.cn"
    },
    "吉林省": {
        "发改部门": "https://jldrc.jl.gov.cn",
        "交通部门": "http://jtyst.jl.gov.cn",
        "住建部门": "http://jst.jl.gov.cn",
        "水利部门": "http://slt.jl.gov.cn",
        "自然资源": "http://zrzy.jl.gov.cn"
    },
    "黑龙江省": {
        "发改部门": "https://drc.hlj.gov.cn",
        "交通部门": "https://jt.hlj.gov.cn",
        "住建部门": "https://zfcxjst.hlj.gov.cn",
        "水利部门": "https://slt.hlj.gov.cn",
        "自然资源": "http://zrzyt.hlj.gov.cn"
    },
    "江苏省": {
        "发改部门": "https://fzggw.jiangsu.gov.cn",
        "交通部门": "https://jtyst.jiangsu.gov.cn",
        "住建部门": "https://jsszfhcxjst.jiangsu.gov.cn",
        "水利部门": "http://jswater.jiangsu.gov.cn",
        "自然资源": "https://zrzy.jiangsu.gov.cn"
    },
    "浙江省": {
        "发改部门": "https://fzggw.zj.gov.cn",
        "交通部门": "https://jtyst.zj.gov.cn",
        "住建部门": "https://jst.zj.gov.cn",
        "水利部门": "https://slt.zj.gov.cn",
        "自然资源": "https://zrzyt.zj.gov.cn"
    },
    "安徽省": {
        "发改部门": "https://fzggw.ah.gov.cn",
        "交通部门": "https://jtt.ah.gov.cn",
        "住建部门": "http://dohurd.ah.gov.cn/index.html",
        "水利部门": "https://slt.ah.gov.cn",
        "自然资源": "https://zrzyt.ah.gov.cn"
    },
    "福建省": {
        "发改部门": "https://fgw.fujian.gov.cn",
        "交通部门": "https://jtyst.fujian.gov.cn",
        "住建部门": "https://zjt.fujian.gov.cn",
        "水利部门": "https://slt.fujian.gov.cn",
        "自然资源": "https://zrzyt.fujian.gov.cn"
    },
    "江西省": {
        "发改部门": "http://drc.jiangxi.gov.cn",
        "交通部门": "https://jt.jiangxi.gov.cn",
        "住建部门": "https://zjt.jiangxi.gov.cn",
        "水利部门": "https://slt.jiangxi.gov.cn",
        "自然资源": "https://bnr.jiangxi.gov.cn"
    },
    "山东省": {
        "发改部门": "http://fgw.shandong.gov.cn",
        "交通部门": "https://jtt.shandong.gov.cn",
        "住建部门": "http://zjt.shandong.gov.cn",
        "水利部门": "http://wr.shandong.gov.cn",
        "自然资源": "http://dnr.shandong.gov.cn"
    },
    "河南省": {
        "发改部门": "https://fgw.henan.gov.cn",
        "交通部门": "https://jtyst.henan.gov.cn",
        "住建部门": "https://hnjs.henan.gov.cn",
        "水利部门": "https://slt.henan.gov.cn",
        "自然资源": "https://dnr.henan.gov.cn"
    },
    "湖北省": {
        "发改部门": "https://fgw.hubei.gov.cn",
        "交通部门": "https://jtt.hubei.gov.cn",
        "住建部门": "https://zjt.hubei.gov.cn",
        "水利部门": "https://slt.hubei.gov.cn",
        "自然资源": "https://zrzyt.hubei.gov.cn"
    },
    "湖南省": {
        "发改部门": "https://fgw.hunan.gov.cn",
        "交通部门": "https://jtt.hunan.gov.cn",
        "住建部门": "https://zjt.hunan.gov.cn",
        "水利部门": "https://slt.hunan.gov.cn",
        "自然资源": "http://zrzyt.hunan.gov.cn"
    },
    "广东省": {
        "发改部门": "https://drc.gd.gov.cn",
        "交通部门": "https://td.gd.gov.cn",
        "住建部门": "http://zfcxjst.gd.gov.cn",
        "水利部门": "http://slt.gd.gov.cn",
        "自然资源": "https://nr.gd.gov.cn"
    },
    "广西壮族自治区": {
        "发改部门": "http://fgw.gxzf.gov.cn",
        "交通部门": "http://jtt.gxzf.gov.cn",
        "住建部门": "http://zjt.gxzf.gov.cn",
        "水利部门": "https://slt.gxzf.gov.cn",
        "自然资源": "https://dnr.gxzf.gov.cn"
    },
    "海南省": {
        "发改部门": "http://plan.hainan.gov.cn",
        "交通部门": "https://jt.hainan.gov.cn",
        "住建部门": "https://zjt.hainan.gov.cn",
        "水利部门": "http://swt.hainan.gov.cn",
        "自然资源": "https://lr.hainan.gov.cn"
    },
    "四川省": {
        "发改部门": "https://fgw.sc.gov.cn",
        "交通部门": "http://jtt.sc.gov.cn",
        "住建部门": "http://jst.sc.gov.cn",
        "水利部门": "https://slt.sc.gov.cn",
        "自然资源": "http://dnr.sc.gov.cn"
    },
    "贵州省": {
        "发改部门": "https://fgw.guizhou.gov.cn",
        "交通部门": "http://jt.guizhou.gov.cn",
        "住建部门": "https://zfcxjst.guizhou.gov.cn",
        "水利部门": "https://mwr.guizhou.gov.cn",
        "自然资源": "https://zrzy.guizhou.gov.cn"
    },
    "云南省": {
        "发改部门": "https://yndrc.yn.gov.cn/html/fagaishuju",
        "交通部门": "https://jtyst.yn.gov.cn",
        "住建部门": "https://zfcxjst.yn.gov.cn",
        "水利部门": "https://wcb.yn.gov.cn",
        "自然资源": "http://dnr.yn.gov.cn"
    },
    "西藏自治区": {
        "发改部门": "https://drc.xizang.gov.cn",
        "交通部门": "https://jtt.xizang.gov.cn",
        "住建部门": "https://zjt.xizang.gov.cn",
        "水利部门": "http://slt.xizang.gov.cn",
        "自然资源": "http://zrzyt.xizang.gov.cn"
    },
    "陕西省": {
        "发改部门": "https://sndrc.shaanxi.gov.cn",
        "交通部门": "https://jtyst.shaanxi.gov.cn",
        "住建部门": "https://js.shaanxi.gov.cn",
        "水利部门": "https://slt.shaanxi.gov.cn",
        "自然资源": "https://zrzyt.shaanxi.gov.cn"
    },
    "甘肃省": {
        "发改部门": "http://fzgg.gansu.gov.cn",
        "交通部门": "http://jtys.gansu.gov.cn",
        "住建部门": "https://zjt.gansu.gov.cn",
        "水利部门": "https://slt.gansu.gov.cn",
        "自然资源": "https://zrzy.gansu.gov.cn"
    },
    "青海省": {
        "发改部门": "http://fgw.qinghai.gov.cn/index.html?chanldesc=0&?pc",
        "交通部门": "https://jtyst.qinghai.gov.cn",
        "住建部门": "http://zjt.qinghai.gov.cn",
        "水利部门": "http://slt.qinghai.gov.cn",
        "自然资源": "https://zrzyt.qinghai.gov.cn"
    },
    "宁夏回族自治区": {
        "发改部门": "https://fzggw.nx.gov.cn",
        "交通部门": "https://jtt.nx.gov.cn",
        "住建部门": "https://jst.nx.gov.cn",
        "水利部门": "https://slt.nx.gov.cn",
        "自然资源": "https://zrzyt.nx.gov.cn"
    },
    "新疆维吾尔自治区": {
        "发改部门": "http://xjdrc.xinjiang.gov.cn",
        "交通部门": "https://jtyst.xinjiang.gov.cn",
        "住建部门": "https://zjt.xinjiang.gov.cn",
        "水利部门": "https://slt.xinjiang.gov.cn",
        "自然资源": "https://zrzyt.xinjiang.gov.cn"
    }
};