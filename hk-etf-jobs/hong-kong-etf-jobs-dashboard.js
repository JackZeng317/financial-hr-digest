"use strict";
(function () {
  const DATA = JSON.parse(document.getElementById("dashboard-data").textContent);
    const ORIGIN_BY_COMPANY = {
      "東方匯理資產管理香港有限公司（Amundi）":"外資", "貝萊德資產管理北亞有限公司（BlackRock）":"外資",
      "中銀國際英國保誠資產管理有限公司（BOCI-Prudential）":"在港中資", "博時基金（國際）有限公司（Bosera）":"在港中資",
      "華夏基金（香港）有限公司（ChinaAMC）":"在港中資", "中國國際金融香港資產管理有限公司（CICC）":"在港中資",
      "南方東英資產管理有限公司（CSOP）":"在港中資", "Deutsche Asset Management S.A.／DWS":"外資",
      "都會金融香港有限公司（Doo Financial）":"港資", "富邦基金管理（香港）有限公司（Fubon）":"外資",
      "恒生投資管理有限公司（Hang Seng Investment Management）":"港資", "嘉實國際資產管理有限公司（Harvest Global Investments）":"在港中資",
      "工銀瑞信資產管理（國際）有限公司（ICBC AM）":"在港中資", "Invesco Capital Management LLC／Invesco Hong Kong":"外資",
      "J.P. Morgan Asset Management（摩根資產管理）":"外資",
      "中國平安資產管理（香港）有限公司（Ping An）":"在港中資", "泰康資產管理（香港）有限公司（Taikang）":"在港中資",
      "惠理基金管理香港有限公司（Value Partners）":"港資", "招商證券國際有限公司":"在港中資",
      "山證國際金融控股有限公司":"在港中資", "State Street 集團香港招聘入口":"外資",
      "CICC":"在港中資", "ChinaAMC":"在港中資", "Hang Seng Investment Management":"港資",
      "Mirae Asset Global Investments (Hong Kong)":"外資", "Amundi Hong Kong Limited":"外資",
      "BlackRock Asset Management North Asia Limited":"外資", "BOCI-Prudential Asset Management Limited":"在港中資",
      "Bosera Asset Management (International) Co., Limited":"在港中資", "China Asset Management (Hong Kong) Limited":"在港中資",
      "China International Capital Corporation Hong Kong Asset Management Limited":"在港中資", "CMS Asset Management (HK) Co., Limited":"在港中資",
      "CSOP Asset Management Limited":"在港中資", "Deutsche Asset Management S.A.":"外資",
      "Doo Financial HK Limited":"港資", "E Fund Management (Hong Kong) Co., Limited":"在港中資",
      "Fubon Fund Management (Hong Kong) Limited":"外資", "Fullgoal Asset Management (HK) Limited":"在港中資",
      "Hang Seng Investment Management Limited":"港資", "Harvest Global Investments Limited":"在港中資",
      "HSBC Investment Funds (Hong Kong) Limited":"外資", "ICBC UBS Asset Management (International) Company Limited":"在港中資",
      "Invesco Capital Management LLC":"外資", "MicroBit Capital Management Limited":"港資",
      "Mirae Asset Global Investments (Hong Kong) Limited":"外資", "Nikko Asset Management Hong Kong Limited":"外資",
      "Pando Finance Limited":"港資", "Phillip Capital Management (HK) Limited":"外資",
      "Ping An of China Asset Management (Hong Kong) Company Limited":"在港中資", "Premia Partners Company Limited":"港資",
      "Samsung Asset Management (Hong Kong) Limited":"外資", "Shanxi Securities International Asset Management Limited":"在港中資",
      "State Street Global Advisors Asia Limited":"外資", "State Street Global Advisors Singapore Limited":"外資",
      "Taikang Asset Management (Hong Kong) Company Limited":"在港中資", "Value Partners Hong Kong Limited":"港資"
    };
    const LOGO_BY_COMPANY = {
      "東方匯理資產管理香港有限公司（Amundi）":"assets/logos/amundi.png",
      "貝萊德資產管理北亞有限公司（BlackRock）":"assets/logos/blackrock.svg",
      "中銀國際英國保誠資產管理有限公司（BOCI-Prudential）":"assets/logos/boci-prudential.svg",
      "博時基金（國際）有限公司（Bosera）":"assets/logos/bosera.ico",
      "華夏基金（香港）有限公司（ChinaAMC）":"assets/logos/chinaamc.ico",
      "中國國際金融香港資產管理有限公司（CICC）":"assets/logos/cicc.png",
      "南方東英資產管理有限公司（CSOP）":"assets/logos/csop.png",
      "Deutsche Asset Management S.A.／DWS":"assets/logos/dws.svg",
      "都會金融香港有限公司（Doo Financial）":"assets/logos/doo-financial.webp",
      "富邦基金管理（香港）有限公司（Fubon）":"assets/logos/fubon.svg",
      "恒生投資管理有限公司（Hang Seng Investment Management）":"assets/logos/hang-seng.svg",
      "嘉實國際資產管理有限公司（Harvest Global Investments）":"assets/logos/harvest.png",
      "工銀瑞信資產管理（國際）有限公司（ICBC AM）":"assets/logos/icbc-am.png",
      "Invesco Capital Management LLC／Invesco Hong Kong":"assets/logos/invesco.svg",
      "J.P. Morgan Asset Management（摩根資產管理）":"assets/logos/jpmorgan.svg",
      "中國平安資產管理（香港）有限公司（Ping An）":"assets/logos/ping-an.jpg",
      "泰康資產管理（香港）有限公司（Taikang）":"assets/logos/taikang.png",
      "惠理基金管理香港有限公司（Value Partners）":"assets/logos/value-partners.png"
    };
    const q = function (s) { return document.querySelector(s); };
    const esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (ch) { return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]; }); };
    const sourceType = function (s) {
      if (s.indexOf("官方") >= 0) return "官方";
      if (s.indexOf("LinkedIn") >= 0) return "LinkedIn";
      if (s.indexOf("JobsDB") >= 0) return "JobsDB";
      return "其他";
    };
    const badge = function (k) {
      const cls = k === "前台" ? "badge-front" : k === "中台" ? "badge-middle" : "badge-back";
      return '<span class="badge ' + cls + '">' + esc(k) + "</span>";
    };
    const originOf = function (company) { return ORIGIN_BY_COMPANY[company] || "待確認"; };
    const originBadge = function (company) {
      const origin = originOf(company);
      const cls = origin === "在港中資" ? "badge-origin-cn" : origin === "港資" ? "badge-origin-hk" : "badge-origin-foreign";
      return '<span class="badge ' + cls + '">' + esc(origin) + "</span>";
    };
    const companyHeading = function (company) {
      const logo = LOGO_BY_COMPANY[company];
      const logoHtml = logo ? '<span class="company-logo-frame" aria-hidden="true"><img class="company-logo" src="' + esc(logo) + '" alt="" loading="lazy"></span>' : '';
      return '<div class="company-heading">' + logoHtml + '<div class="company-heading-copy"><h3>' + esc(company) + '</h3>' + originBadge(company) + '</div></div>';
    };
    const link = function (title, url, cls) {
      return '<a class="' + (cls || "job-link") + '" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(title) + "</a>";
    };

    const HRD = window.HR_DIGEST_DATA || {reports:[]};
    const HRD_REGIONS = {
      "HK/Greater China": {label:"香港／大中華", cls:""},
      "Mainland China": {label:"中國內地", cls:"hrd-dot-cn"},
      "Asia Pacific": {label:"亞太", cls:"hrd-dot-apac"},
      "International": {label:"國際", cls:"hrd-dot-intl"},
      "Compensation": {label:"薪酬", cls:"hrd-dot-comp"}
    };
    const hrdState = {query:"", period:"ALL", region:"all", open:new Set(), closed:new Set(), allOpen:false};
    const hrdReports = Array.isArray(HRD.reports) ? HRD.reports.slice().sort(function (a,b) {
      return String(b.date).localeCompare(String(a.date));
    }) : [];
    if (hrdReports.length) hrdState.open.add(hrdReports[0].date);

    const safeHrdUrl = function (value) {
      try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : "";
      } catch (error) { return ""; }
    };
    const hrdHighlight = function (value, query) {
      const text = String(value == null ? "" : value);
      if (!query) return esc(text);
      const pattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      try {
        return text.split(new RegExp("(" + pattern + ")", "gi")).map(function (part) {
          return part.toLocaleLowerCase("zh-Hant") === query.toLocaleLowerCase("zh-Hant") ? "<mark>" + esc(part) + "</mark>" : esc(part);
        }).join("");
      } catch (error) { return esc(text); }
    };
    const hrdMatches = function (item, query) {
      if (!query) return true;
      const haystack = [item.title, item.org, item.hr]
        .concat(item.bullets || [])
        .concat((item.sources || []).map(function (source) { return source.name; }))
        .join(" ")
        .toLocaleLowerCase("zh-Hant");
      return haystack.indexOf(query.toLocaleLowerCase("zh-Hant")) >= 0;
    };
    const hrdFilteredReports = function () {
      return hrdReports.filter(function (report) {
        return hrdState.period === "ALL" || report.date === hrdState.period;
      }).map(function (report) {
        const sections = (report.sections || []).filter(function (section) {
          return hrdState.region === "all" || section.region === hrdState.region;
        }).map(function (section) {
          return {
            region: section.region,
            emoji: section.emoji,
            items: (section.items || []).filter(function (item) { return hrdMatches(item, hrdState.query); })
          };
        }).filter(function (section) { return section.items.length > 0; });
        return {
          report: report,
          sections: sections,
          count: sections.reduce(function (sum, section) { return sum + section.items.length; }, 0)
        };
      }).filter(function (entry) { return entry.count > 0; });
    };
    const hrdItemHtml = function (item) {
      const bullets = (item.bullets || []).length
        ? '<ul class="hrd-bullets">' + item.bullets.map(function (bullet) { return '<li>' + hrdHighlight(bullet, hrdState.query) + '</li>'; }).join("") + '</ul>'
        : "";
      const view = item.hr ? '<div class="hrd-view"><strong>💡 HR 視角：</strong>' + hrdHighlight(item.hr, hrdState.query) + '</div>' : "";
      const sources = (item.sources || []).map(function (source) {
        const url = safeHrdUrl(source.url);
        return url ? '<a class="hrd-source" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(source.name || "來源") + '</a>' : "";
      }).filter(Boolean);
      const sourceHtml = sources.length ? '<div class="hrd-sources"><span>📎 來源</span>' + sources.join("") + '</div>' : "";
      const org = item.org ? '<span class="hrd-org">' + hrdHighlight(item.org, hrdState.query) + '</span>' : "";
      const session = item.session === "evening" ? '<span class="hrd-org">晚間場</span>' : "";
      return '<article class="hrd-item"><div class="hrd-item-head"><span class="hrd-item-num">' + esc(item.num) + '.</span><h4 class="hrd-item-title">' + hrdHighlight(item.title, hrdState.query) + '</h4>' + org + session + '</div>' + bullets + view + sourceHtml + '</article>';
    };
    const hrdSectionHtml = function (section) {
      const region = HRD_REGIONS[section.region] || {label:section.region, cls:""};
      return '<section class="hrd-section"><div class="hrd-section-title"><span class="hrd-dot ' + esc(region.cls) + '"></span>' + esc(region.label) + ' · ' + section.items.length + ' 條</div>' + section.items.map(hrdItemHtml).join("") + '</section>';
    };
    const hrdReportHtml = function (entry) {
      const report = entry.report;
      const isOpen = hrdState.allOpen ? !hrdState.closed.has(report.date) : hrdState.open.has(report.date);
      const sessions = (report.sessions || []).map(function (session) {
        if (session === "evening") return '<span class="hrd-session hrd-session-evening">含晚間場</span>';
        if (session === "catchup") return '<span class="hrd-session">補刊</span>';
        return "";
      }).join("");
      let body = "";
      if (isOpen) {
        const insights = (report.insights || []).length
          ? '<aside class="hrd-insights"><h4>🧭 本期啟示</h4><ul>' + report.insights.map(function (insight) { return '<li>' + hrdHighlight(insight, hrdState.query) + '</li>'; }).join("") + '</ul></aside>'
          : "";
        body = '<div class="hrd-report-body">' + entry.sections.map(hrdSectionHtml).join("") + insights + '</div>';
      }
      return '<article class="card hrd-report" data-hrd-date="' + esc(report.date) + '"><button class="hrd-report-head" type="button" aria-expanded="' + String(isOpen) + '"><span class="hrd-report-date">' + esc(report.date) + '</span>' + sessions + '<span class="hrd-report-count">' + (isOpen ? '▼' : '▶') + ' ' + entry.count + ' 條</span></button>' + (report.summary ? '<div class="hrd-summary">' + hrdHighlight(report.summary, hrdState.query) + '</div>' : "") + body + '</article>';
    };
    const renderHrd = function () {
      const reports = hrdFilteredReports();
      const count = reports.reduce(function (sum, entry) { return sum + entry.count; }, 0);
      q("#hrd-list").innerHTML = reports.map(hrdReportHtml).join("");
      q("#hrd-list").hidden = reports.length === 0;
      q("#hrd-empty").hidden = reports.length !== 0;
      q("#hrd-result-count").textContent = "顯示 " + reports.length + " 期、" + count + " 條資訊";
      q("#hrd-toggle-all").textContent = hrdState.allOpen ? "摺疊全部" : "展開全部";
    };
    const initHrd = function () {
      const reportTotal = HRD.reportCount || hrdReports.length;
      const itemTotal = HRD.totalItems || hrdReports.reduce(function (sum, report) { return sum + (report.itemCount || 0); }, 0);
      q("#hrd-report-total").textContent = reportTotal;
      q("#hrd-item-total").textContent = itemTotal;
      q("#hrd-tab-count").textContent = reportTotal;
      q("#hrd-date-range").textContent = "資料日期：" + (Array.isArray(HRD.dateRange) ? HRD.dateRange.join(" 至 ") : "—");
      q("#hrd-generated-at").textContent = HRD.generatedAt || "—";
      q("#people-footer-updated").textContent = "更新於 " + (HRD.generatedAt || "—");
      q("#hrd-period").insertAdjacentHTML("beforeend", hrdReports.map(function (report) {
        return '<option value="' + esc(report.date) + '">' + esc(report.date) + '（' + esc(report.itemCount || 0) + ' 條）</option>';
      }).join(""));
      q("#hrd-filters-form").addEventListener("submit", function (event) {
        event.preventDefault();
        hrdState.query = q("#hrd-search").value.trim();
        hrdState.period = q("#hrd-period").value;
        hrdState.region = q("#hrd-region").value;
        hrdState.closed.clear();
        if (hrdState.query) {
          hrdState.allOpen = true;
          hrdState.open.clear();
        } else if (hrdState.period !== "ALL") {
          hrdState.allOpen = false;
          hrdState.open.clear();
          hrdState.open.add(hrdState.period);
        } else {
          hrdState.allOpen = false;
          hrdState.open.clear();
          if (hrdReports.length) hrdState.open.add(hrdReports[0].date);
        }
        renderHrd();
      });
      q("#hrd-search").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          q("#hrd-filters-form").requestSubmit();
        }
      });
      q("#hrd-reset").addEventListener("click", function () {
        q("#hrd-search").value = "";
        q("#hrd-period").value = "ALL";
        q("#hrd-region").value = "all";
        hrdState.query = "";
        hrdState.period = "ALL";
        hrdState.region = "all";
        hrdState.allOpen = false;
        hrdState.open.clear();
        hrdState.closed.clear();
        if (hrdReports.length) hrdState.open.add(hrdReports[0].date);
        renderHrd();
      });
      q("#hrd-toggle-all").addEventListener("click", function () {
        hrdState.allOpen = !hrdState.allOpen;
        hrdState.open.clear();
        hrdState.closed.clear();
        renderHrd();
      });
      q("#hrd-list").addEventListener("click", function (event) {
        const head = event.target.closest(".hrd-report-head");
        if (!head) return;
        const date = head.closest(".hrd-report").dataset.hrdDate;
        if (hrdState.allOpen) {
          if (hrdState.closed.has(date)) hrdState.closed.delete(date);
          else hrdState.closed.add(date);
        } else if (hrdState.open.has(date)) hrdState.open.delete(date);
        else hrdState.open.add(date);
        renderHrd();
      });
      renderHrd();
    };
    initHrd();

    const companies = Array.from(new Set(DATA.jobs.map(function (d) { return d.company; }))).sort(function (a,b) { return a.localeCompare(b, "zh-Hant"); });
    q("#company-filter").insertAdjacentHTML("beforeend", companies.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + "</option>"; }).join(""));
    q("#official-count").textContent = DATA.jobs.filter(function (d) { return sourceType(d.source) === "官方"; }).length;

    const counts = {};
    DATA.jobs.forEach(function (d) { counts[d.company] = (counts[d.company] || 0) + 1; });
    const top = Object.keys(counts).map(function (c) { return [c, counts[c]]; }).sort(function (a,b) { return b[1]-a[1]; }).slice(0,5);
    const maxTop = top[0][1];
    q("#top-companies").innerHTML = top.map(function (d) {
      const short = d[0].replace(/有限公司/g,"").replace(/（[^）]+）/g,"").replace(/ Asset Management.*/,"").trim();
      return '<div class="mini-row"><span>' + esc(short) + '</span><div class="mini-track"><div class="mini-fill" style="width:' + (d[1]/maxTop*100).toFixed(1) + '%"></div></div><strong>' + d[1] + '</strong></div>';
    }).join("");

    const renderJobGroups = function (items) {
      const grouped = new Map();
      items.forEach(function (d) {
        if (!grouped.has(d.company)) grouped.set(d.company, []);
        grouped.get(d.company).push(d);
      });
      return Array.from(grouped.entries()).map(function (entry) {
        const company = entry[0];
        const rows = entry[1].map(function (d, index) {
          const st = sourceType(d.source);
          const sourceHtml = st === "官方" ? '<span class="badge badge-official">官方</span><span class="source-label">' + esc(d.source) + '</span>' : '<span class="source-label">來源：' + esc(d.source) + '</span>';
          return '<article class="job-item"><span class="job-number">' + String(index + 1).padStart(2,"0") + '</span><div><a class="job-title-link" href="' + esc(d.url) + '" target="_blank" rel="noopener noreferrer">' + esc(d.title) + '</a><div class="job-meta">' + badge(d.category) + sourceHtml + '</div></div>' + link("申請 ↗",d.url,"apply") + '</article>';
        }).join("");
        return '<details class="card job-company" open><summary>' + companyHeading(company) + '<span class="company-job-count">' + entry[1].length + ' 個職位</span></summary><div class="job-list">' + rows + '</div></details>';
      }).join("");
    };

    const history = (Array.isArray(DATA.history) ? DATA.history : []).slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
    const historyJobs = function (snapshot) {
      if (snapshot && snapshot.jobsRef === "current") return DATA.jobs;
      return snapshot && Array.isArray(snapshot.jobs) ? snapshot.jobs : [];
    };
    const historyStats = function (items) {
      const roleCounts = {"前台":0,"中台":0,"後台":0};
      items.forEach(function (d) { if (Object.prototype.hasOwnProperty.call(roleCounts, d.category)) roleCounts[d.category] += 1; });
      return {
        jobs: items.length,
        companies: new Set(items.map(function (d) { return d.company; })).size,
        roles: roleCounts
      };
    };
    const historyStat = function (label, value) {
      return '<article class="card history-stat"><div class="history-stat-label">' + esc(label) + '</div><div class="history-stat-value">' + esc(value) + '</div></article>';
    };
    const historyWeek = function (snapshot) {
      const items = historyJobs(snapshot);
      return '<section class="history-week" aria-label="' + esc(snapshot.date) + ' 搜尋紀錄"><div class="history-week-head"><h3>' + esc(snapshot.date) + '</h3><div class="history-week-meta">核驗時間：' + esc(snapshot.checkedAt || snapshot.date) + '（香港時間） · ' + items.length + ' 個職位</div></div><div class="job-groups">' + renderJobGroups(items) + '</div></section>';
    };
    const renderHistory = function () {
      const selected = q("#history-period").value;
      const snapshots = selected === "all" ? history : history.filter(function (d) { return d.date === selected; });
      const latest = snapshots[0];
      if (!latest) {
        q("#history-summary").innerHTML = "";
        q("#history-list").innerHTML = "";
        q("#history-empty").hidden = false;
        return;
      }
      const stats = historyStats(historyJobs(latest));
      q("#history-summary").innerHTML = selected === "all"
        ? historyStat("已保存週期", snapshots.length) + historyStat("最新一期職位", stats.jobs) + historyStat("最新招聘品牌", stats.companies) + historyStat("最新前／中／後台", stats.roles["前台"] + " / " + stats.roles["中台"] + " / " + stats.roles["後台"])
        : historyStat("已驗證職位", stats.jobs) + historyStat("有招聘的品牌", stats.companies) + historyStat("前／中／後台", stats.roles["前台"] + " / " + stats.roles["中台"] + " / " + stats.roles["後台"]) + historyStat("核驗時間", latest.checkedAt || latest.date);
      q("#history-list").innerHTML = snapshots.map(historyWeek).join("");
      q("#history-empty").hidden = true;
    };
    q("#history-period").insertAdjacentHTML("beforeend", history.map(function (snapshot) {
      return '<option value="' + esc(snapshot.date) + '">' + esc(snapshot.date) + '（' + historyJobs(snapshot).length + ' 職位）</option>';
    }).join(""));
    if (history.length) q("#history-period").value = history[0].date;

    let visibleJobs = DATA.jobs.slice();
    function renderJobs() {
      const term = q("#search").value.trim().toLocaleLowerCase("zh-Hant");
      const company = q("#company-filter").value;
      const origin = q("#origin-filter").value;
      const category = q("#category-filter").value;
      const source = q("#source-filter").value;
      visibleJobs = DATA.jobs.filter(function (d) {
        const hay = (d.company + " " + originOf(d.company) + " " + d.title).toLocaleLowerCase("zh-Hant");
        return (!term || hay.indexOf(term) >= 0) &&
          (!company || d.company === company) &&
          (!origin || originOf(d.company) === origin) &&
          (!category || d.category === category) &&
          (!source || sourceType(d.source) === source);
      });
      q("#jobs-list").innerHTML = renderJobGroups(visibleJobs);
      q("#result-count").textContent = "顯示 " + visibleJobs.length + "／" + DATA.jobs.length + " 個";
      q("#jobs-empty").hidden = visibleJobs.length !== 0;
      q("#jobs-list").hidden = visibleJobs.length === 0;
    }

    q("#coverage-body").innerHTML = DATA.coverage.map(function (d) {
      let status = "已檢查";
      if (/官方.*\d+個|香港清單 3 個|共 2 個/.test(d.result)) status = "官方在招";
      else if (/No vacancy|未找到|未見公開在招|無公開招聘職位/.test(d.result)) status = "未見官方職位";
      return '<tr><td data-label="#">' + d.n + '</td><td class="company-cell" data-label="法律實體">' + esc(d.entity) + '</td><td data-label="公司背景">' + originBadge(d.entity) + '</td><td data-label="官方來源">' + link(d.label,d.url) + '</td><td data-label="核查結果"><span class="status">' + esc(status) + '</span><div class="coverage-result">' + esc(d.result) + '</div></td></tr>';
    }).join("");

    q("#appendix-body").innerHTML = DATA.appendix.map(function (d) {
      return '<tr><td class="company-cell" data-label="集團公司">' + esc(d.company) + '</td><td data-label="公司背景">' + originBadge(d.company) + '</td><td data-label="分類">' + badge(d.category) + '</td><td data-label="職位">' + link(d.title,d.url) + '</td><td data-label="申請">' + link("開啟 ↗",d.url,"apply") + '</td></tr>';
    }).join("");

    q("#pending-body").innerHTML = DATA.pending.map(function (d) {
      return '<tr><td class="company-cell" data-label="公司">' + esc(d.company) + '</td><td data-label="公司背景">' + originBadge(d.company) + '</td><td data-label="分類">' + badge(d.category) + '</td><td data-label="職位線索">' + link(d.title,d.url) + '</td><td data-label="未通過原因"><span class="badge badge-pending">待核實</span><div class="coverage-result">' + esc(d.reason) + '</div></td></tr>';
    }).join("");
    q("#pending-empty").hidden = DATA.pending.length !== 0;
    q("#pending-table-wrap").hidden = DATA.pending.length === 0;

    q("#history-form").addEventListener("submit", function (event) {
      event.preventDefault();
      renderHistory();
    });

    q("#filters-form").addEventListener("submit", function (event) {
      event.preventDefault();
      renderJobs();
    });
    q("#reset").addEventListener("click", function () {
      q("#search").value = "";
      q("#company-filter").value = "";
      q("#origin-filter").value = "";
      q("#category-filter").value = "";
      q("#source-filter").value = "";
      renderJobs();
    });

    let activeChapter = window.location.hash === "#people" ? "people" : "etf";
    let activeEtfTab = "jobs";
    const etfSectionIds = ["etf-intro","etf-kpis","etf-insights","etf-origin","etf-tabs"];
    const etfPanelNames = ["jobs","history","coverage","appendix","pending"];
    const setChapter = function (chapter, moveToContent) {
      activeChapter = chapter === "people" ? "people" : "etf";
      document.querySelectorAll(".chapter-tab").forEach(function (tab) {
        tab.setAttribute("aria-selected", String(tab.dataset.chapter === activeChapter));
      });
      document.querySelectorAll("[data-chapter-stat]").forEach(function (stat) {
        stat.hidden = stat.dataset.chapterStat !== activeChapter;
      });
      etfSectionIds.forEach(function (id) { q("#" + id).hidden = activeChapter !== "etf"; });
      etfPanelNames.forEach(function (name) {
        q("#" + name + "-panel").hidden = activeChapter !== "etf" || name !== activeEtfTab;
      });
      q("#people-panel").hidden = activeChapter !== "people";
      q("#etf-footer").hidden = activeChapter !== "etf";
      q("#people-footer").hidden = activeChapter !== "people";
      try {
        window.history.replaceState(null, "", window.location.pathname + window.location.search + (activeChapter === "people" ? "#people" : "#etf"));
      } catch (error) { /* 靜態預覽環境可能不允許改寫網址 */ }
      if (moveToContent && window.scrollY > q(".chapter-bar").offsetTop + 80) {
        q(".chapter-bar").scrollIntoView({behavior:"smooth", block:"start"});
      }
    };

    document.querySelectorAll(".chapter-tab").forEach(function (tab) {
      tab.addEventListener("click", function () { setChapter(tab.dataset.chapter, true); });
    });
    window.addEventListener("hashchange", function () {
      setChapter(window.location.hash === "#people" ? "people" : "etf", false);
    });
    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        activeEtfTab = tab.dataset.tab;
        document.querySelectorAll(".tab").forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
        etfPanelNames.forEach(function (name) { q("#" + name + "-panel").hidden = activeChapter !== "etf" || tab.dataset.tab !== name; });
      });
    });
    q("#jump-jobs").addEventListener("click", function () {
      setChapter("etf", false);
      q("#jobs-tab").click();
      q("#jobs-panel").scrollIntoView({behavior:"smooth", block:"start"});
      q("#search").focus({preventScroll:true});
    });
    q("#export-csv").addEventListener("click", function () {
      const safe = function (v) {
        let s = String(v == null ? "" : v);
        if (/^[-=+@]/.test(s)) s = "'" + s;
        return '"' + s.replace(/"/g,'""') + '"';
      };
      const rows = [["公司","公司背景","分類","職位","來源","申請連結"]].concat(visibleJobs.map(function (d) { return [d.company,originOf(d.company),d.category,d.title,d.source,d.url]; }));
      const blob = new Blob(["\\ufeff" + rows.map(function (r) { return r.map(safe).join(","); }).join("\\r\\n")], {type:"text/csv;charset=utf-8"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "hong-kong-etf-jobs.csv";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    renderJobs();
    renderHistory();
    setChapter(activeChapter, false);
})();
