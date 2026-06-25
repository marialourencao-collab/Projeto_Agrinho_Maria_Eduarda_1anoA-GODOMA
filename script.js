 let currentFontSize = 16;
    const bodyEl = document.body;

    document.getElementById('btn-increase-font').addEventListener('click', () => {
        if (currentFontSize + 2 <= 24) {
            currentFontSize += 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    document.getElementById('btn-decrease-font').addEventListener('click', () => {
        if (currentFontSize - 2 >= 12) {
            currentFontSize -= 2;
            document.documentElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    document.getElementById('btn-toggle-contrast').addEventListener('click', () => {
        bodyEl.classList.toggle('high-contrast');
    });

    // ==========================================================================
    // INTERATIVIDADE DA CALCULADORA DE CO2
    // ==========================================================================
    const transportSelect = document.getElementById('transport-select');
    const meatSelect = document.getElementById('meat-select');
    const energySelect = document.getElementById('energy-select');
    const calcResult = document.getElementById('calc-result');

    function calcularPegada() {
        const transportValue = parseInt(transportSelect.value) || 0;
        const meatValue = parseInt(meatSelect.value) || 0;
        const energyValue = parseInt(energySelect.value) || 0;
        
        const totalCO2 = transportValue + meatValue + energyValue;
        const arvores = Math.ceil(totalCO2 / 15); // Estimativa simples: 1 árvore absorve ~15kg de CO2/mês

        calcResult.innerHTML = `<strong>Resultado:</strong> Sua pegada mensal estimada é de <strong>${totalCO2} kg de CO₂</strong>.<br>Seriam necessárias aproximadamente <strong>${arvores} árvores</strong> por mês para neutralizar seu impacto ambiental.`;
    }

    [transportSelect, meatSelect, energySelect].forEach(select => {
        select.addEventListener('change', calcularPegada);
    });
    
    // Inicializa cálculo básico
    calcularPegada();

    // ==========================================================================
    // COMPONENTE: CARROSSEL DE DEPOIMENTOS (ARRAY DE OBJETOS)
    // ==========================================================================
    const depoimentosData = [
        {
            texto: "Mudar meus hábitos alimentares e adotar a compostagem doméstica reduziu meu lixo semanal em 80%. A calculadora do EcoVida me ajudou a mensurar isso de verdade!",
            autor: "Mariana Silva, Designer - São Paulo"
        },
        {
            texto: "Instalei painéis solares na minha microempresa após compreender o real retorno ecológico e financeiro. Recomendo a todos fazerem essa transição.",
            autor: "Carlos Eduardo, Empreendedor - Curitiba"
        },
        {
            texto: "O consumo consciente mudou não apenas minha relação com o lixo, mas também as minhas finanças. Sustentabilidade é viável e necessária.",
            autor: "Beatriz Costa, Educadora - Salvador"
        }
    ];

    const track = document.getElementById('carousel-track');
    let currentSlide = 0;

    function renderCarrossel() {
        track.innerHTML = depoimentosData.map((d, index) => `
            <div class="testimonial-card ${index === 0 ? 'active' : ''}" role="group" aria-label="Depoimento ${index + 1} de ${depoimentosData.length}">
                <p>"${d.texto}"</p>
                <div class="testimonial-author">${d.autor}</div>
            </div>
        `).join('');
    }

    function showSlide(index) {
        const slides = document.querySelectorAll('.testimonial-card');
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    document.getElementById('carousel-next').addEventListener('click', () => showSlide(currentSlide + 1));
    document.getElementById('carousel-prev').addEventListener('click', () => showSlide(currentSlide - 1));

    renderCarrossel();

    // ==========================================================================
    // COMPONENTE: ACORDEÃO FAQ (ARRAY DE OBJETOS)
    // ==========================================================================
    const faqData = [
        {
            pergunta: "Por onde devo começar a transição sustentável?",
            resposta: "Comece pelo mais simples: separe seu lixo reciclável do orgânico e reduza o consumo de sacolas e plásticos descartáveis no seu dia a dia."
        },
        {
            pergunta: "Como funciona a compensação por árvores?",
            resposta: "As plantas absorvem dióxido de carbono durante a fotossíntese. Plantar árvores nativas ajuda a capturar os gases do efeito estufa emitidos por nossas atividades."
        },
        {
            pergunta: "O que é consumo consciente?",
            resposta: "É o ato de consumir adquirindo apenas o necessário, priorizando empresas éticas, produtos duráveis e de baixo impacto ambiental desde a produção até o descarte."
        }
    ];

    const faqAccordion = document.getElementById('faq-accordion');

    function renderFAQ() {
        faqAccordion.innerHTML = faqData.map((f, index) => `
            <div class="faq-item">
                <button class="faq-trigger" aria-expanded="false" aria-controls="panel-${index}">
                    <span>${f.pergunta}</span>
                    <span class="faq-icon" aria-hidden="true">+</span>
                </button>
                <div id="panel-${index}" class="faq-panel" role="region">
                    <p>${f.resposta}</p>
                </div>
            </div>
        `).join('');

        // Adiciona eventos aos novos elementos gerados
        const triggers = document.querySelectorAll('.faq-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const item = this.parentElement;
                const isOpen = item.classList.contains('open');
                
                // Fecha todos
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                document.querySelectorAll('.faq-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
                
                // Abre o atual se não estava aberto
                if (!isOpen) {
                    item.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
