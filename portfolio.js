const articleMap = {
    llm: {
        title: "LLM 微调与对齐：从参数更新到行为塑形",
        meta: "LLM / alignment / sft / inference / practical notes",
        body: [
            "这一部分会记录我对 Transformer、Attention、LoRA、QLoRA、RLHF、DPO、MoE、KV Cache 与 vLLM 的持续学习，也会整理我在实习与项目中接触到的 SFT 流程、模型评测、推理部署与效果优化经验。",
            "我关注的不只是训练参数和 loss 曲线，还包括模型在任务边界、异常输入和复杂场景中的行为稳定性，以及回复质量如何被数据、Prompt、知识与推理策略共同塑造。",
            "这些笔记会尽量兼顾原理、实验观察与工程实现，帮助自己把“会用模型”逐步推进到“理解模型如何工作、何时失效、如何改进”。"
        ]
    },
    control: {
        title: "控制理论与智能控制：把动态系统写成可以推演的结构",
        meta: "control / mpc / fuzzy pid / neural control",
        body: [
            "我会在这里整理 PID、模糊控制、模糊 PID、MPC、Moving Horizon Estimation，以及 NN-MPC、LSTM-MPC 等内容，把课程中的控制理论逐步连接到更智能、更数据驱动的控制系统设计。",
            "吸引我的不是公式本身，而是控制思想如何帮助我们理解反馈、稳定性、预测与约束，进而为复杂系统提供结构化的决策方式。",
            "长期来看，我希望继续探索 AI 与控制系统之间更深的结合，例如 Agent、预测模型和控制逻辑如何在真实系统中协同工作。"
        ]
    },
    vision: {
        title: "多模态与 VLM：让图像、文本与检索共同参与推理",
        meta: "vlm / multimodal rag / clip / visual reasoning",
        body: [
            "这里主要记录多模态大模型、视觉语言模型和多模态 RAG 的相关学习与实践，包括图像特征建模、文本语义对齐、CLIP 一致性验证以及多源信息融合策略。",
            "在 MAAR-Agent 项目中，我开始系统思考图像检索、网页检索和文本检索如何围绕同一个问题协作，以及事实验证如何降低生成阶段的幻觉风险。",
            "我希望这一部分最终能沉淀出一套自己真正理解的多模态推理框架，而不仅仅是工具和模型名的堆叠。"
        ]
    },
    security: {
        title: "RAG 与知识增强：从检索链路到回答可靠性",
        meta: "rag / retrieval / rerank / evaluation / knowledge systems",
        body: [
            "这里会持续整理 BM25、Dense Retrieval、Hybrid Retrieval、FAISS、Milvus、Chroma、BGE-Reranker 与 Cross Encoder 等内容，也会记录我如何理解 Recall、Faithfulness 与 Hallucination 等评测维度。",
            "医疗知识库 RAG 系统与多模态 Agent RAG 项目让我更清楚地看到，好的问答系统不只是“接一个向量库”，而是检索、重排、验证、反馈和生成共同组成的工程链路。",
            "我尤其关注知识增强系统在真实场景中的可维护性和可扩展性，例如索引更新、查询优化、用户反馈回流与系统自我优化如何真正落地。"
        ]
    },
    essay: {
        title: "系统与工程基础：从课程知识走向可部署系统",
        meta: "systems / compiler / os / network / engineering",
        body: [
            "这一部分会整理数据库、中间件、网络协议、分布式基础，以及编译原理、操作系统、数据结构与算法等内容，因为我越来越意识到，真正可靠的 AI 系统离不开扎实的工程与系统能力。",
            "我希望自己不仅能训练模型、调 Prompt、做检索，也能理解消息传递、缓存一致性、限流熔断、词法语法分析、内存管理与页面置换等底层机制。",
            "这些基础能力看起来分散，但它们共同决定了一个系统是否真的可运行、可部署、可扩展，也构成了我未来想继续深耕的软件工程 Agent 与 AI4Research 方向的底座。"
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
