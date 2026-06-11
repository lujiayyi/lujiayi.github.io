import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

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
    const elements = document.querySelectorAll(".hero-copy, .hero-stage, .manifesto-band, .project-panel, .graph-surface, .article-drawer");
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

function initHeroTopology() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) {
        return;
    }

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const root = new THREE.Group();
    scene.add(root);

    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const metadata = [];
    const tempVector = new THREE.Vector3();

    for (let index = 0; index < particleCount; index += 1) {
        const phi = Math.acos(1 - 2 * ((index + 0.5) / particleCount));
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
        const radius = 2.22 + Math.sin(index * 0.18) * 0.08;

        metadata.push({
            phi,
            theta,
            radius,
            noise: Math.random() * Math.PI * 2,
            pulse: Math.random() * Math.PI * 2
        });

        positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[index * 3 + 1] = radius * Math.cos(phi);
        positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

        const warmMix = 0.65 + 0.35 * Math.sin(index * 0.07);
        colors[index * 3] = 0.86;
        colors[index * 3 + 1] = 0.58 + 0.16 * warmMix;
        colors[index * 3 + 2] = 0.48 + 0.18 * (1 - warmMix);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    root.add(points);

    const wirePositions = [];
    const wireMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color("#d48764"),
        transparent: true,
        opacity: 0.12
    });

    for (let index = 0; index < 180; index += 6) {
        const current = metadata[index];
        const next = metadata[index + 6];
        const across = metadata[(index + 84) % metadata.length];

        [next, across].forEach((target) => {
            wirePositions.push(
                current.radius * Math.sin(current.phi) * Math.cos(current.theta),
                current.radius * Math.cos(current.phi),
                current.radius * Math.sin(current.phi) * Math.sin(current.theta),
                target.radius * Math.sin(target.phi) * Math.cos(target.theta),
                target.radius * Math.cos(target.phi),
                target.radius * Math.sin(target.phi) * Math.sin(target.theta)
            );
        });
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(wirePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, wireMaterial);
    root.add(lines);

    const glowGeometry = new THREE.SphereGeometry(2.4, 48, 48);
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            glowColor: { value: new THREE.Color("#efc9aa") }
        },
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
                gl_FragColor = vec4(glowColor * intensity, intensity * 0.28);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.scale.setScalar(1.16);
    root.add(glow);

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = 420;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
        dustPositions[index * 3] = (Math.random() - 0.5) * 12;
        dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 10;
        dustPositions[index * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dust = new THREE.Points(
        dustGeometry,
        new THREE.PointsMaterial({
            color: new THREE.Color("#95c9c4"),
            size: 0.02,
            transparent: true,
            opacity: 0.22,
            depthWrite: false
        })
    );
    scene.add(dust);

    const mouse = { x: 0, y: 0 };
    const pointer = new THREE.Vector2();
    const ripples = [];

    function resize() {
        const bounds = canvas.getBoundingClientRect();
        renderer.setSize(bounds.width, bounds.height, false);
        camera.aspect = bounds.width / bounds.height;
        camera.updateProjectionMatrix();
    }

    canvas.addEventListener("pointermove", (event) => {
        const bounds = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        mouse.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    });

    canvas.addEventListener("pointerleave", () => {
        mouse.x = 0;
        mouse.y = 0;
    });

    canvas.addEventListener("click", () => {
        ripples.push({ age: 0, strength: 0.36 });
    });

    const clock = new THREE.Clock();

    function animate() {
        const elapsed = clock.getElapsedTime();
        const positionArray = geometry.attributes.position.array;

        pointer.set(mouse.x, mouse.y);

        for (let index = 0; index < particleCount; index += 1) {
            const data = metadata[index];
            const breathing = Math.sin(elapsed * 0.7 + data.noise) * 0.08;
            const drift = Math.sin(elapsed * 1.1 + data.pulse) * 0.03;
            const localRadius = data.radius + breathing + drift;

            tempVector.set(
                Math.sin(data.phi) * Math.cos(data.theta + elapsed * 0.07),
                Math.cos(data.phi),
                Math.sin(data.phi) * Math.sin(data.theta + elapsed * 0.07)
            );

            const projectedX = tempVector.x * 0.58;
            const projectedY = tempVector.y * 0.58;
            const distanceToMouse = Math.hypot(projectedX - pointer.x * 0.5, projectedY - pointer.y * 0.5);
            const mouseInfluence = Math.max(0, 1 - distanceToMouse * 2.1) * 0.24;

            let rippleOffset = 0;
            ripples.forEach((ripple) => {
                rippleOffset += Math.sin(ripple.age * 12 - distanceToMouse * 18) * ripple.strength * Math.exp(-ripple.age * 1.8);
            });

            const finalRadius = localRadius + mouseInfluence + rippleOffset;

            positionArray[index * 3] = tempVector.x * finalRadius;
            positionArray[index * 3 + 1] = tempVector.y * finalRadius;
            positionArray[index * 3 + 2] = tempVector.z * finalRadius;
        }

        ripples.forEach((ripple) => {
            ripple.age += 0.018;
        });

        while (ripples.length && ripples[0].age > 1.5) {
            ripples.shift();
        }

        geometry.attributes.position.needsUpdate = true;
        root.rotation.y = elapsed * 0.16;
        root.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + mouse.y * 0.16;
        root.rotation.z = mouse.x * 0.12;

        dust.rotation.y = -elapsed * 0.04;
        glow.material.uniforms.glowColor.value.offsetHSL(Math.sin(elapsed * 0.1) * 0.0008, 0, 0);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animate();
}

initReveal();
initAgentNetwork();
initTrajectoryCanvas();
initGraph();
initHeroTopology();
