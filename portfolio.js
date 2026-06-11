const articleMap = {
    llm: {
        title: "微调与对齐：从参数更新到行为雕刻",
        meta: "LLM / alignment / practical notes",
        body: [
            "关注的不只是 loss 曲线，而是模型在任务边界、提示分布变化和异常输入下的行为稳定性。",
            "我会把微调流程拆成数据构形、优化策略、对齐校验三个层面，让训练结果不仅更强，也更可控。",
            "这个节点适合放训练 recipe、失败案例、评测模板，以及对推理风格变化的观察。 "
        ]
    },
    control: {
        title: "控制系统建模：把动态系统写成可推演的结构",
        meta: "control / graph dynamics / system design",
        body: [
            "对复杂系统的兴趣来自于“状态如何相互牵引”这个问题。图结构和控制思维可以一起描述反馈、耦合与稳定性。",
            "博客内容可以覆盖状态空间、图上传播、可解释控制逻辑，以及如何把抽象模型转成可视化决策界面。",
            "这种写法也很适合连接心理学、协作系统和多智能体中的关系建模。"
        ]
    },
    vision: {
        title: "视频目标检测：时空轨迹如何变成证据",
        meta: "video / detection / temporal reasoning",
        body: [
            "对视频任务来说，单帧识别只是入口，真正关键的是把对象、动作和时间线组织成可解释的连续证据。",
            "这里会沉淀检测模型选择、轨迹平滑、误差来源分析，以及面向 VAR 场景的规则映射设计。",
            "文章展开时可以像证据抽屉一样，展示一条完整的时空推理链。"
        ]
    },
    security: {
        title: "自动化网络防御：把文本攻防转成操作系统",
        meta: "security / phishing / automated workflows",
        body: [
            "PhishLLM 的核心不是分类分数本身，而是将钓鱼文本、页面痕迹和对抗策略串成自动化分析路径。",
            "我希望把安全检测界面做得像实时仪表盘，但语言上仍然保持克制与可解释性。",
            "这个节点适合承载 prompt attack、邮件线索分析和多步骤判定流程的可视化记录。"
        ]
    },
    essay: {
        title: "心理学与复杂感知：技术之外的观察手记",
        meta: "essay / perception / methodology",
        body: [
            "这一部分不是鸡汤，而是关于感知、关系、空间与方法论的慢速笔记。",
            "当系统设计面对真实的人，界面就不只是效率工具，还要承担认知引导、情绪负载和意义组织。",
            "这会成为整个 portfolio 最柔软但也最有辨识度的层次。"
        ]
    }
};

function setArticle(articleId) {
    const article = articleMap[articleId];
    if (!article) {
        return;
    }

    const title = document.getElementById("article-title");
    const meta = document.getElementById("article-meta");
    const body = document.getElementById("article-body");

    title.textContent = article.title;
    meta.textContent = article.meta;
    body.innerHTML = article.body.map((paragraph) => `<p>${paragraph}</p>`).join("");

    document.querySelectorAll(".graph-node").forEach((node) => {
        node.classList.toggle("active", node.dataset.article === articleId);
    });
}

function initReveal() {
    const elements = document.querySelectorAll(".hero-copy, .manifesto-band, .project-panel, .graph-surface, .article-drawer");
    elements.forEach((element) => {
        element.setAttribute("data-reveal", "");
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));
}

function initAgentNetwork() {
    const container = document.getElementById("agent-network");
    if (!container) {
        return;
    }

    const nodes = [
        { x: 18, y: 20 },
        { x: 38, y: 32 },
        { x: 67, y: 22 },
        { x: 76, y: 54 },
        { x: 54, y: 72 },
        { x: 22, y: 62 }
    ];

    const links = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 0],
        [1, 4],
        [0, 4]
    ];

    links.forEach(([sourceIndex, targetIndex]) => {
        const source = nodes[sourceIndex];
        const target = nodes[targetIndex];
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const length = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const link = document.createElement("div");
        link.className = "agent-link";
        link.style.left = `${source.x}%`;
        link.style.top = `${source.y}%`;
        link.style.width = `${length}%`;
        link.style.transform = `rotate(${angle}deg)`;
        container.appendChild(link);
    });

    nodes.forEach((node, index) => {
        const element = document.createElement("div");
        element.className = "agent-node";
        element.style.left = `${node.x}%`;
        element.style.top = `${node.y}%`;
        element.style.animation = `pulse ${6 + index * 0.4}s ease-in-out infinite`;
        container.appendChild(element);
    });

    if (!document.getElementById("agent-pulse-style")) {
        const style = document.createElement("style");
        style.id = "agent-pulse-style";
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.8; }
                50% { transform: translate3d(0, -6px, 0) scale(1.15); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function initTrajectoryCanvas() {
    const canvas = document.getElementById("trajectory-canvas");
    if (!canvas) {
        return;
    }

    const context = canvas.getContext("2d");
    const points = Array.from({ length: 72 }, (_, index) => ({
        x: index / 71,
        y: 0.5 + Math.sin(index * 0.3) * 0.18
    }));

    function resize() {
        const bounds = canvas.getBoundingClientRect();
        canvas.width = bounds.width * devicePixelRatio;
        canvas.height = bounds.height * devicePixelRatio;
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function render(time) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        context.clearRect(0, 0, width, height);

        context.lineWidth = 1.4;
        context.strokeStyle = "rgba(217, 119, 87, 0.72)";
        context.beginPath();

        points.forEach((point, index) => {
            const x = point.x * width;
            const y =
                height * (0.2 + point.y * 0.56) +
                Math.sin(time * 0.0012 + index * 0.22) * 18;
            if (index === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        });

        context.stroke();

        points.forEach((point, index) => {
            const x = point.x * width;
            const y =
                height * (0.2 + point.y * 0.56) +
                Math.sin(time * 0.0012 + index * 0.22) * 18;
            const radius = 2 + ((Math.sin(time * 0.001 + index) + 1) * 1.6);

            context.beginPath();
            context.fillStyle = index % 6 === 0 ? "rgba(122, 199, 196, 0.92)" : "rgba(217, 119, 87, 0.76)";
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
        });

        requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(render);
}

function initGraph() {
    const surface = document.querySelector(".graph-surface");
    const nodes = Array.from(document.querySelectorAll(".graph-node"));
    const svg = document.getElementById("graph-links");

    if (!surface || !nodes.length || !svg) {
        return;
    }

    const relations = [
        ["llm", "control"],
        ["llm", "security"],
        ["control", "vision"],
        ["vision", "essay"],
        ["security", "essay"],
        ["control", "security"]
    ];

    const lines = relations.map(([from, to]) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("stroke", "rgba(217, 119, 87, 0.22)");
        line.setAttribute("stroke-width", "1.4");
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("stroke-dasharray", "5 9");
        line.dataset.from = from;
        line.dataset.to = to;
        svg.appendChild(line);
        return line;
    });

    function getNodeCenter(node) {
        return {
            x: node.offsetLeft + node.offsetWidth / 2,
            y: node.offsetTop + node.offsetHeight / 2
        };
    }

    function updateLines() {
        lines.forEach((line) => {
            const fromNode = nodes.find((node) => node.dataset.article === line.dataset.from);
            const toNode = nodes.find((node) => node.dataset.article === line.dataset.to);
            if (!fromNode || !toNode) {
                return;
            }

            const start = getNodeCenter(fromNode);
            const end = getNodeCenter(toNode);

            line.setAttribute("x1", start.x);
            line.setAttribute("y1", start.y);
            line.setAttribute("x2", end.x);
            line.setAttribute("y2", end.y);
        });
    }

    nodes.forEach((node) => {
        node.addEventListener("click", () => setArticle(node.dataset.article));

        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;

        node.addEventListener("pointerdown", (event) => {
            dragging = true;
            node.setPointerCapture(event.pointerId);
            offsetX = event.clientX - node.offsetLeft;
            offsetY = event.clientY - node.offsetTop;
            node.style.cursor = "grabbing";
        });

        node.addEventListener("pointermove", (event) => {
            if (!dragging) {
                return;
            }

            const bounds = surface.getBoundingClientRect();
            const width = node.offsetWidth;
            const height = node.offsetHeight;
            const nextLeft = Math.min(Math.max(event.clientX - bounds.left - offsetX, 12), bounds.width - width - 12);
            const nextTop = Math.min(Math.max(event.clientY - bounds.top - offsetY, 12), bounds.height - height - 12);

            node.style.left = `${(nextLeft / bounds.width) * 100}%`;
            node.style.top = `${(nextTop / bounds.height) * 100}%`;
            updateLines();
        });

        node.addEventListener("pointerup", (event) => {
            dragging = false;
            node.releasePointerCapture(event.pointerId);
            node.style.cursor = "grab";
        });
    });

    window.addEventListener("resize", updateLines);
    updateLines();
    setArticle("llm");
}

function initMercuryBackground() {
    const canvas = document.getElementById("mercury-canvas");
    if (!canvas) {
        return;
    }

    const context = canvas.getContext("2d");
    const pointer = {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.38,
        targetX: window.innerWidth * 0.5,
        targetY: window.innerHeight * 0.38
    };
    const flowNodes = [
        { ox: 0.18, oy: 0.22, base: 170, amp: 34, speed: 0.9, color: "212, 215, 218" },
        { ox: 0.82, oy: 0.2, base: 190, amp: 42, speed: 0.75, color: "180, 188, 195" },
        { ox: 0.24, oy: 0.72, base: 220, amp: 56, speed: 0.62, color: "140, 150, 158" },
        { ox: 0.78, oy: 0.74, base: 205, amp: 48, speed: 0.56, color: "120, 129, 138" },
        { ox: 0.52, oy: 0.42, base: 250, amp: 38, speed: 0.68, color: "236, 224, 214" }
    ];
    const ripples = [];

    function resize() {
        canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
        canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    window.addEventListener("pointermove", (event) => {
        pointer.targetX = event.clientX;
        pointer.targetY = event.clientY;
    });

    window.addEventListener("pointerleave", () => {
        pointer.targetX = window.innerWidth * 0.5;
        pointer.targetY = window.innerHeight * 0.38;
    });

    window.addEventListener("click", () => {
        ripples.push({ x: pointer.targetX, y: pointer.targetY, age: 0, strength: 1 });
    });

    function drawBlob(x, y, radius, rgbaColor, blur) {
        const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius);
        gradient.addColorStop(0, `rgba(${rgbaColor}, 0.95)`);
        gradient.addColorStop(0.55, `rgba(${rgbaColor}, 0.28)`);
        gradient.addColorStop(1, `rgba(${rgbaColor}, 0)`);
        context.filter = `blur(${blur}px)`;
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.filter = "none";
    }

    function animate(time) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const t = time * 0.001;

        pointer.x += (pointer.targetX - pointer.x) * 0.08;
        pointer.y += (pointer.targetY - pointer.y) * 0.08;

        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = "source-over";

        const base = context.createLinearGradient(0, 0, width, height);
        base.addColorStop(0, "rgba(255, 250, 245, 0.32)");
        base.addColorStop(1, "rgba(243, 236, 228, 0.18)");
        context.fillStyle = base;
        context.fillRect(0, 0, width, height);

        context.globalCompositeOperation = "multiply";

        flowNodes.forEach((node, index) => {
            const driftX = Math.sin(t * node.speed + index) * node.amp;
            const driftY = Math.cos(t * (node.speed * 0.8) + index * 0.6) * node.amp * 0.7;
            const mouseDx = (pointer.x - width * node.ox) * 0.05;
            const mouseDy = (pointer.y - height * node.oy) * 0.035;
            const x = width * node.ox + driftX + mouseDx;
            const y = height * node.oy + driftY + mouseDy;
            const radius = node.base + Math.sin(t * 1.8 + index) * node.amp * 0.55;
            drawBlob(x, y, radius, node.color, 26);
            drawBlob(x + mouseDx * 0.35, y + mouseDy * 0.35, radius * 0.48, "255, 255, 255", 16);
        });

        drawBlob(pointer.x * 0.84 + width * 0.08, pointer.y * 0.72 + height * 0.08, 170, "115, 122, 132", 38);
        drawBlob(pointer.x, pointer.y, 92, "255, 255, 255", 20);

        ripples.forEach((ripple) => {
            ripple.age += 0.018;
            const radius = 80 + ripple.age * 280;
            context.strokeStyle = `rgba(160, 164, 170, ${0.18 * (1 - ripple.age)})`;
            context.lineWidth = 20 * (1 - ripple.age * 0.66);
            context.filter = "blur(8px)";
            context.beginPath();
            context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
            context.stroke();
            context.filter = "none";
        });

        while (ripples.length && ripples[0].age > 1) {
            ripples.shift();
        }

        context.globalCompositeOperation = "screen";
        const sheen = context.createLinearGradient(pointer.x - 220, pointer.y - 180, pointer.x + 260, pointer.y + 220);
        sheen.addColorStop(0, "rgba(255,255,255,0)");
        sheen.addColorStop(0.5, "rgba(255,255,255,0.24)");
        sheen.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = sheen;
        context.fillRect(0, 0, width, height);

        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(animate);
}

initReveal();
initAgentNetwork();
initTrajectoryCanvas();
initGraph();
initMercuryBackground();
