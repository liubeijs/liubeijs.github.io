const provinceDepartments = {
    "全国": {
        "中国政府网": "http://www.gov.cn",
        "中国发展改革委": "https://www.ndrc.gov.cn",
        "中国交通运输部": "https://www.mot.gov.cn",
        "中国住房城乡建设部": "https://www.mohurd.gov.cn",
        "中国水利部": "https://www.mwr.gov.cn",
        "中国自然资源部": "https://www.mnr.gov.cn",
        "中国生态环境部": "https://www.mee.gov.cn",
        "全国公共资源交易平台": "https://www.ggzy.gov.cn/",
        "全国公路监管平台": "https://hwdms.mot.gov.cn/BMWebSite/",
        "全国水利监管平台": "https://scjg.mwr.gov.cn/#/home"
    },
    "北京市": {
        "政府网站": "http://www.beijing.gov.cn",
        "发改部门": "https://fgw.beijing.gov.cn",
        "交通部门": "https://jtw.beijing.gov.cn",
        "住建部门": "https://zjw.beijing.gov.cn",
        "水利部门": "https://swj.beijing.gov.cn",
        "自然资源": "https://ghzrzyw.beijing.gov.cn",
        "生态环境": "http://sthjj.beijing.gov.cn",
        "公共资源": "https://ggzyfw.beijing.gov.cn"
    },
    "上海市": {
        "政府网站": "https://www.shanghai.gov.cn",
        "发改部门": "https://fgw.sh.gov.cn",
        "交通部门": "https://jtw.sh.gov.cn",
        "住建部门": "https://zjw.sh.gov.cn",
        "水利部门": "https://swj.sh.gov.cn",
        "自然资源": "https://ghzyj.sh.gov.cn",
        "生态环境": "https://sthj.sh.gov.cn",
        "公共资源": "https://www.shggzy.com/"
    },
    "天津市": {
        "政府网站": "http://www.tj.gov.cn",
        "发改部门": "https://fzgg.tj.gov.cn",
        "交通部门": "https://jtys.tj.gov.cn",
        "住建部门": "https://zfcxjs.tj.gov.cn",
        "水利部门": "https://swj.tj.gov.cn",
        "自然资源": "https://ghhzrzy.tj.gov.cn",
        "生态环境": "https://sthj.tj.gov.cn",
        "公共资源": "http://www.tjggzy.cn/"
    },
    "重庆市": {
        "政府网站": "http://www.cq.gov.cn",
        "发改部门": "https://fzggw.cq.gov.cn",
        "交通部门": "https://jtj.cq.gov.cn",
        "住建部门": "https://zfcxjw.cq.gov.cn",
        "水利部门": "https://slj.cq.gov.cn",
        "自然资源": "http://ghzrzyj.cq.gov.cn",
        "生态环境": "http://sthjj.cq.gov.cn",
        "公共资源": "https://www.cqggzy.com"
    },
    "河北省": {
        "政府网站": "http://www.hebei.gov.cn",
        "发改部门": "https://hbdrc.hebei.gov.cn",
        "交通部门": "https://jtt.hebei.gov.cn/zwgk",
        "住建部门": "https://zfcxjst.hebei.gov.cn",
        "水利部门": "http://slt.hebei.gov.cn",
        "自然资源": "https://zrzy.hebei.gov.cn",
        "生态环境": "http://hbepb.hebei.gov.cn",
        "公共资源": "http://www.hebeieb.com/"
    },
    "山西省": {
        "政府网站": "http://www.shanxi.gov.cn",
        "发改部门": "https://fgw.shanxi.gov.cn",
        "交通部门": "https://jtyst.shanxi.gov.cn",
        "住建部门": "https://zjt.shanxi.gov.cn",
        "水利部门": "https://slt.shanxi.gov.cn",
        "自然资源": "http://zrzyt.shanxi.gov.cn",
        "生态环境": "http://sthjt.shanxi.gov.cn",
        "公共资源": "http://prec.sxzwfw.gov.cn"
    },
    "内蒙古自治区": {
        "政府网站": "http://www.nmg.gov.cn",
        "发改部门": "https://fgw.nmg.gov.cn",
        "交通部门": "https://jtyst.nmg.gov.cn",
        "住建部门": "https://zjt.nmg.gov.cn",
        "水利部门": "https://slt.nmg.gov.cn",
        "自然资源": "https://zrzy.nmg.gov.cn",
        "生态环境": "http://sthjt.nmg.gov.cn",
        "公共资源": "http://ggzyjy.nmg.gov.cn"
    },
    "辽宁省": {
        "政府网站": "http://www.ln.gov.cn",
        "发改部门": "https://fgw.ln.gov.cn",
        "交通部门": "https://jtt.ln.gov.cn",
        "住建部门": "https://zjt.ln.gov.cn",
        "水利部门": "https://slt.ln.gov.cn",
        "自然资源": "https://zrzy.ln.gov.cn",
        "生态环境": "http://sthj.ln.gov.cn",
        "公共资源": "http://ggzy.ln.gov.cn"
    },
    "吉林省": {
        "政府网站": "http://www.jl.gov.cn",
        "发改部门": "https://jldrc.jl.gov.cn",
        "交通部门": "http://jtyst.jl.gov.cn",
        "住建部门": "http://jst.jl.gov.cn",
        "水利部门": "http://slt.jl.gov.cn",
        "自然资源": "http://zrzy.jl.gov.cn",
        "生态环境": "http://sthj.jl.gov.cn",
        "公共资源": "http://www.jl.gov.cn/ggzy"
    },
    "黑龙江省": {
        "政府网站": "http://www.hlj.gov.cn",
        "发改部门": "https://drc.hlj.gov.cn",
        "交通部门": "https://jt.hlj.gov.cn",
        "住建部门": "https://zfcxjst.hlj.gov.cn",
        "水利部门": "https://slt.hlj.gov.cn",
        "自然资源": "http://zrzyt.hlj.gov.cn",
        "生态环境": "https://sthj.hlj.gov.cn",
        "公共资源": "https://ggzyjyw.hlj.gov.cn/"
    },
    "江苏省": {
        "政府网站": "http://www.jiangsu.gov.cn",
        "发改部门": "https://fzggw.jiangsu.gov.cn",
        "交通部门": "https://jtyst.jiangsu.gov.cn",
        "住建部门": "https://jsszfhcxjst.jiangsu.gov.cn",
        "水利部门": "http://jswater.jiangsu.gov.cn",
        "自然资源": "https://zrzy.jiangsu.gov.cn",
        "生态环境": "http://hbt.jiangsu.gov.cn",
        "公共资源": "http://jsggzy.jszwfw.gov.cn"
    },
    "浙江省": {
        "政府网站": "http://www.zj.gov.cn",
        "发改部门": "https://fzggw.zj.gov.cn",
        "交通部门": "https://jtyst.zj.gov.cn",
        "住建部门": "https://jst.zj.gov.cn",
        "水利部门": "https://slt.zj.gov.cn",
        "自然资源": "https://zrzyt.zj.gov.cn",
        "生态环境": "https://sthjt.zj.gov.cn",
        "公共资源": "https://ggzy.zj.gov.cn"
    },
    "安徽省": {
        "政府网站": "http://www.ah.gov.cn",
        "发改部门": "https://fzggw.ah.gov.cn",
        "交通部门": "https://jtt.ah.gov.cn",
        "住建部门": "http://dohurd.ah.gov.cn/index.html",
        "水利部门": "https://slt.ah.gov.cn",
        "自然资源": "https://zrzyt.ah.gov.cn",
        "生态环境": "https://sthjt.ah.gov.cn",
        "公共资源": "http://ggzy.ah.gov.cn"
    },
    "福建省": {
        "政府网站": "http://www.fujian.gov.cn",
        "发改部门": "https://fgw.fujian.gov.cn",
        "交通部门": "https://jtyst.fujian.gov.cn",
        "住建部门": "https://zjt.fujian.gov.cn",
        "水利部门": "https://slt.fujian.gov.cn",
        "自然资源": "https://zrzyt.fujian.gov.cn",
        "生态环境": "https://sthjt.fujian.gov.cn",
        "公共资源": "https://ggzyfw.fujian.gov.cn"
    },
    "江西省": {
        "政府网站": "http://www.jiangxi.gov.cn",
        "发改部门": "http://drc.jiangxi.gov.cn",
        "交通部门": "https://jt.jiangxi.gov.cn",
        "住建部门": "https://zjt.jiangxi.gov.cn",
        "水利部门": "https://slt.jiangxi.gov.cn",
        "自然资源": "https://bnr.jiangxi.gov.cn",
        "生态环境": "http://sthj.jiangxi.gov.cn",
        "公共资源": "https://www.jxsggzy.cn"
    },
    "山东省": {
        "政府网站": "http://www.shandong.gov.cn",
        "发改部门": "http://fgw.shandong.gov.cn",
        "交通部门": "https://jtt.shandong.gov.cn",
        "住建部门": "http://zjt.shandong.gov.cn",
        "水利部门": "http://wr.shandong.gov.cn",
        "自然资源": "http://dnr.shandong.gov.cn",
        "生态环境": "http://sthj.shandong.gov.cn",
        "公共资源": "https://ggzyjy.shandong.gov.cn/"
    },
    "河南省": {
        "政府网站": "http://www.henan.gov.cn",
        "发改部门": "https://fgw.henan.gov.cn",
        "交通部门": "https://jtyst.henan.gov.cn",
        "住建部门": "https://hnjs.henan.gov.cn",
        "水利部门": "https://slt.henan.gov.cn",
        "自然资源": "https://dnr.henan.gov.cn",
        "生态环境": "https://sthjt.henan.gov.cn",
        "公共资源": "https://hnsggzyjy.henan.gov.cn/"
    },
    "湖北省": {
        "政府网站": "http://www.hubei.gov.cn",
        "发改部门": "https://fgw.hubei.gov.cn",
        "交通部门": "https://jtt.hubei.gov.cn",
        "住建部门": "https://zjt.hubei.gov.cn",
        "水利部门": "https://slt.hubei.gov.cn",
        "自然资源": "https://zrzyt.hubei.gov.cn",
        "生态环境": "http://sthjt.hubei.gov.cn",
        "公共资源": "http://www.hbggzy.cn"
    },
    "湖南省": {
        "政府网站": "http://www.hunan.gov.cn",
        "发改部门": "https://fgw.hunan.gov.cn",
        "交通部门": "https://jtt.hunan.gov.cn",
        "住建部门": "https://zjt.hunan.gov.cn",
        "水利部门": "https://slt.hunan.gov.cn",
        "自然资源": "http://zrzyt.hunan.gov.cn",
        "生态环境": "http://sthjt.hunan.gov.cn",
        "公共资源": "https://ggzy.hunan.gov.cn",
        "政府采购": "http://www.ccgp-hunan.gov.cn/",
        "招投标监管": "http://bidding.fgw.hunan.gov.cn/",
    },
    "广东省": {
        "政府网站": "http://www.gd.gov.cn",
        "发改部门": "https://drc.gd.gov.cn",
        "交通部门": "https://td.gd.gov.cn",
        "住建部门": "http://zfcxjst.gd.gov.cn",
        "水利部门": "http://slt.gd.gov.cn",
        "自然资源": "https://nr.gd.gov.cn",
        "生态环境": "http://sthjt.gd.gov.cn",
        "公共资源": "https://ygp.gdzwfw.gov.cn/#/44/index"
    },
    "广西壮族自治区": {
        "政府网站": "http://www.gxzf.gov.cn",
        "发改部门": "http://fgw.gxzf.gov.cn",
        "交通部门": "http://jtt.gxzf.gov.cn",
        "住建部门": "http://zjt.gxzf.gov.cn",
        "水利部门": "https://slt.gxzf.gov.cn",
        "自然资源": "https://dnr.gxzf.gov.cn",
        "生态环境": "http://sthjt.gxzf.gov.cn",
        "公共资源": "http://gxggzy.gxzf.gov.cn/index.shtml"
    },
    "海南省": {
        "政府网站": "http://www.hainan.gov.cn",
        "发改部门": "http://plan.hainan.gov.cn",
        "交通部门": "https://jt.hainan.gov.cn",
        "住建部门": "https://zjt.hainan.gov.cn",
        "水利部门": "http://swt.hainan.gov.cn",
        "自然资源": "https://lr.hainan.gov.cn",
        "生态环境": "http://sthjt.hainan.gov.cn",
        "公共资源": "https://ggzy.hainan.gov.cn/ggzyjy/",
        "建筑市场监管平台": "https://sys.hizj.net:8801/#/home",
    },
    "四川省": {
        "政府网站": "http://www.sc.gov.cn",
        "发改部门": "https://fgw.sc.gov.cn",
        "交通部门": "http://jtt.sc.gov.cn",
        "住建部门": "http://jst.sc.gov.cn",
        "水利部门": "https://slt.sc.gov.cn",
        "自然资源": "http://dnr.sc.gov.cn",
        "生态环境": "http://sthjt.sc.gov.cn",
        "公共资源": "https://ggzyjy.sc.gov.cn/jyxx/transactionInfo.html"
    },
    "贵州省": {
        "政府网站": "http://www.guizhou.gov.cn",
        "发改部门": "https://fgw.guizhou.gov.cn",
        "交通部门": "http://jt.guizhou.gov.cn",
        "住建部门": "https://zfcxjst.guizhou.gov.cn",
        "水利部门": "https://mwr.guizhou.gov.cn",
        "自然资源": "https://zrzy.guizhou.gov.cn",
        "生态环境": "http://sthjt.guizhou.gov.cn",
        "公共资源": "http://ggzy.guizhou.gov.cn"
    },
    "云南省": {
        "政府网站": "http://www.yn.gov.cn",
        "发改部门": "https://yndrc.yn.gov.cn/html/fagaishuju",
        "交通部门": "https://jtyst.yn.gov.cn",
        "住建部门": "https://zfcxjst.yn.gov.cn",
        "水利部门": "https://wcb.yn.gov.cn",
        "自然资源": "http://dnr.yn.gov.cn",
        "生态环境": "http://sthjt.yn.gov.cn",
        "公共资源": "http://ggzy.yn.gov.cn"
    },
    "西藏自治区": {
        "政府网站": "http://www.xizang.gov.cn",
        "发改部门": "https://drc.xizang.gov.cn",
        "交通部门": "https://jtt.xizang.gov.cn",
        "住建部门": "https://zjt.xizang.gov.cn",
        "水利部门": "http://slt.xizang.gov.cn",
        "自然资源": "http://zrzyt.xizang.gov.cn",
        "生态环境": "http://sthjt.xizang.gov.cn",
        "公共资源": "http://ggzy.xizang.gov.cn"
    },
    "陕西省": {
        "政府网站": "http://www.shaanxi.gov.cn",
        "发改部门": "https://sndrc.shaanxi.gov.cn",
        "交通部门": "https://jtyst.shaanxi.gov.cn",
        "住建部门": "https://js.shaanxi.gov.cn",
        "水利部门": "https://slt.shaanxi.gov.cn",
        "自然资源": "https://zrzyt.shaanxi.gov.cn",
        "生态环境": "http://sthjt.shaanxi.gov.cn",
        "公共资源": "http://www.sxggzyjy.cn"
    },
    "甘肃省": {
        "政府网站": "http://www.gansu.gov.cn",
        "发改部门": "http://fzgg.gansu.gov.cn",
        "交通部门": "http://jtys.gansu.gov.cn",
        "住建部门": "https://zjt.gansu.gov.cn",
        "水利部门": "https://slt.gansu.gov.cn",
        "自然资源": "https://zrzy.gansu.gov.cn",
        "生态环境": "https://sthjt.gansu.gov.cn",
        "公共资源": "http://ggzyjy.gansu.gov.cn"
    },
    "青海省": {
        "政府网站": "http://www.qh.gov.cn",
        "发改部门": "http://fgw.qinghai.gov.cn/index.html?chanldesc=0&?pc",
        "交通部门": "https://jtyst.qinghai.gov.cn",
        "住建部门": "http://zjt.qinghai.gov.cn",
        "水利部门": "http://slt.qinghai.gov.cn",
        "自然资源": "https://zrzyt.qinghai.gov.cn",
        "生态环境": "https://sthj.qinghai.gov.cn",
        "公共资源": "http://www.qhggzyjy.gov.cn"
    },
    "宁夏回族自治区": {
        "政府网站": "http://www.nx.gov.cn",
        "发改部门": "https://fzggw.nx.gov.cn",
        "交通部门": "https://jtt.nx.gov.cn",
        "住建部门": "https://jst.nx.gov.cn",
        "水利部门": "https://slt.nx.gov.cn",
        "自然资源": "https://zrzyt.nx.gov.cn",
        "生态环境": "http://sthjt.nx.gov.cn",
        "公共资源": "https://ggzyjy.fzggw.nx.gov.cn/"
    },
    "新疆维吾尔自治区": {
        "政府网站": "http://www.xinjiang.gov.cn",
        "发改部门": "http://xjdrc.xinjiang.gov.cn",
        "交通部门": "https://jtyst.xinjiang.gov.cn",
        "住建部门": "https://zjt.xinjiang.gov.cn",
        "水利部门": "https://slt.xinjiang.gov.cn",
        "自然资源": "https://zrzyt.xinjiang.gov.cn",
        "生态环境": "http://sthj.xinjiang.gov.cn",
        "公共资源": "http://ggzy.xinjiang.gov.cn"
    }
};