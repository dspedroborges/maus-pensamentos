"use client";

import { useEffect, useState } from "react";
import PieWrapper from "./components/PieWrapper";
import LineWrapper from "./components/LineWrapper";
import { BsQuestionCircle } from "react-icons/bs";

const initialArray = [
  {
    "name": "Pensamento dicotômico (também denominado pensamento do tipo tudo-ou-nada, preto e branco ou polarizado)",
    "description": "Vejo a situação, a pessoa ou o acontecimento apenas em termos de 'uma coisa ou outra', colocando-as em apenas duas categorias extremas em vez de em um contínuo.",
    "examples": ["'Eu cometi um erro, logo meu rendimento foi um fracasso'", "'Comi mais do que pretendia, portanto estraguei completamente minha dieta'"],
    "score": 0,
    "explanation": "Esse pensamento é disfuncional porque simplifica excessivamente a complexidade da realidade. A maioria das situações não se encaixa em extremos absolutos; ao ignorar as nuances, essa visão polarizada falha em capturar a verdadeira natureza dos eventos e experiências, o que leva a julgamentos errôneos."
  },
  {
    "name": "Previsão do futuro (também denominada catastrofização)",
    "description": "Antecipo o futuro em termos negativos e acredito que o que acontecerá será tão horrível que eu não vou suportar.",
    "examples": ["'Vou fracassar e isso será insuportável.'", "'Vou ficar tão perturbado que não conseguirei me concentrar no exame.'"],
    "score": 0,
    "explanation": "Prever o futuro negativamente é disfuncional porque baseia-se em suposições infundadas em vez de em evidências concretas. Ao antecipar o pior sem qualquer fundamento lógico, negligencia-se a incerteza natural da vida e a capacidade humana de lidar com adversidades, o que leva a uma visão distorcida da realidade."
  },
  {
    "name": "Desqualificação dos aspectos positivos",
    "description": "Desqualifico e desconto as experiências e acontecimentos positivos insistindo que estes não contam.",
    "examples": ["'Fui aprovado no exame, mas foi pura sorte.'", "'Entrar para a faculdade não foi grande coisa, qualquer um consegue.'"],
    "score": 0,
    "explanation": "Desqualificar aspectos positivos é disfuncional porque distorce a percepção da realidade ao não reconhecer eventos positivos como legítimos. Isso viola o princípio de que as experiências devem ser avaliadas de maneira equilibrada, levando a uma visão irrealisticamente negativa de si mesmo e do mundo."
  },
  {
    "name": "Raciocínio emocional",
    "description": "Acredito que minhas emoções refletem a realidade e deixo que elas guiem minhas atitudes e julgamentos.",
    "examples": ["'Sinto que ela me ama, então deve ser verdade.'", "'Tenho pavor de aviões, logo voar deve ser perigoso.'", "'Meus sentimentos me dizem que não devo acreditar nele.'"],
    "score": 0,
    "explanation": "O raciocínio emocional é disfuncional porque presume que as emoções, que são subjetivas e temporárias, refletem com precisão a realidade objetiva. Esse pensamento ignora a diferença entre sentimentos e fatos, levando a decisões e julgamentos baseados em percepções errôneas."
  },
  {
    "name": "Rotulação",
    "description": "Coloco um rótulo fixo, global e geralmente negativo em mim ou nos outros.",
    "examples": ["'Sou um fracassado.'", "'Ele é uma pessoa estragada.'", "'Ela é uma completa imbecil.'"],
    "score": 0,
    "explanation": "Rotular pessoas, incluindo a si mesmo, é disfuncional porque simplifica indevidamente a complexidade do comportamento humano. As pessoas são multifacetadas e não podem ser definidas por um único rótulo, o que desconsidera as variações e a possibilidade de mudança e crescimento."
  },
  {
    "name": "Ampliação/minimização",
    "description": "Avalio a mim mesmo, os outros e as situações ampliando os aspectos negativos e/ou minimizando os aspectos positivos.",
    "examples": ["'Consegui um 8. Isto demonstra o quanto meu desempenho foi ruim.'", "'Consegui um 10. Isto significa que o teste foi muito fácil.'"],
    "score": 0,
    "explanation": "A ampliação ou minimização é disfuncional porque distorce a avaliação equilibrada de situações e eventos. Isso vai contra o princípio da objetividade, onde cada elemento deve ser considerado em seu devido peso, levando a uma visão desproporcional e irrealista das experiências."
  },
  {
    "name": "Abstração seletiva (também denominada filtro mental e visão em túnel)",
    "description": "Presto atenção em um ou poucos detalhes e não consigo ver o quadro inteiro.",
    "examples": ["'Miguel apontou um erro em meu trabalho. Então, posso ser despedido' (não considerando o retorno positivo de Miguel).", "'Não consigo esquecer que aquela informação que dei durante minha apresentação estava errada' (deixando de considerar o sucesso da apresentação e o aplauso das pessoas)."],
    "score": 0,
    "explanation": "A abstração seletiva é disfuncional porque concentra-se em detalhes específicos, ignorando o contexto mais amplo. Esse pensamento quebra o princípio de considerar todos os elementos relevantes de uma situação, resultando em uma percepção desequilibrada e parcial da realidade."
  },
  {
    "name": "Leitura mental",
    "description": "Acredito que conheço os pensamentos e intenções de outros (ou que eles conhecem meus pensamentos e intenções) sem ter evidências suficientes.",
    "examples": ["'Ele está pensando que eu falhei.'", "'Ela pensou que eu não conhecia o projeto.'", "'Ele sabe que eu não gosto de ser tocada deste jeito.'"],
    "score": 0,
    "explanation": "A leitura mental é disfuncional porque assume a capacidade de conhecer os pensamentos dos outros sem base em evidências, violando o princípio da comunicação direta e transparente. Isso leva a mal-entendidos e interpretações incorretas, que não correspondem à realidade."
  },
  {
    "name": "Supergeneralização",
    "description": "Eu tomo casos negativos isolados e os generalizo, tornando-os um padrão interminável com o uso repetido de palavras como 'sempre', 'nunca', 'todo', 'inteiro', etc.",
    "examples": ["'Estava chovendo esta manhã, o que significa que choverá todo o fim de semana.'", "'Que azar! Perdi o avião, logo isto vai estragar minhas férias inteiras'.", "'Minha dor de cabeça nunca vai parar.'"],
    "score": 0,
    "explanation": "A supergeneralização é disfuncional porque extrapola eventos isolados para criar padrões universais sem justificativa. Esse pensamento viola o princípio da singularidade dos eventos, levando a conclusões amplas e incorretas que não refletem a diversidade das experiências."
  },
  {
    "name": "Personalização",
    "description": "Assumo que comportamentos dos outros e eventos externos dizem respeito (ou são direcionados) a mim, sem considerar outras explicações plausíveis.",
    "examples": ["'Senti-me desrespeitado porque a moça do caixa não me agradeceu' (sem considerar que ela não agradeceu a ninguém).", "'Meu marido me deixou porque eu fui uma má esposa' (deixando de considerar que ela foi sua quarta esposa)."],
    "score": 0,
    "explanation": "A personalização é disfuncional porque interpreta os eventos externos como sendo diretamente relacionados a si mesmo, ignorando outras explicações possíveis. Isso contradiz o princípio da causalidade múltipla, onde os eventos têm várias causas, e não necessariamente estão ligados ao indivíduo."
  },
  {
    "name": "Afirmações do tipo 'deveria' (também 'devia', 'devo', 'tenho de')",
    "description": "Digo a mim mesmo que os acontecimentos, os comportamentos de outras pessoas e minhas próprias atitudes 'deveriam' ser da forma que espero que sejam e não o que de fato são.",
    "examples": ["'Eu devia ter sido uma mãe melhor.'", "'Ele deveria ter se casado com Ana em vez de Maria.'", "'Eu não devia ter cometido tantos erros.'"],
    "score": 0,
    "explanation": "Essas afirmações são disfuncionais porque estabelecem expectativas rígidas e irreais, ignorando a complexidade das circunstâncias e o fato de que o comportamento humano é influenciado por muitos fatores. Isso viola o princípio da aceitação da realidade tal como ela é ou se tornou, em vez de como gostaríamos que fosse, uma vez que certas coisas não podem ser mudadas mais."
  },
  {
    "name": "Conclusões precipitadas (também conhecidas como inferências arbitrárias)",
    "description": "Tiro conclusões (negativas ou positivas) a partir de nenhuma ou de poucas evidências que possam confirmá-las.",
    "examples": ["'Logo que o vi, soube que ele faria um trabalho deplorável.'", "'Ele olhou para mim de um modo que logo concluí que ele foi o responsável pelo acidente.'"],
    "score": 0,
    "explanation": "Conclusões precipitadas são disfuncionais porque se baseiam em suposições, em vez de em fatos concretos, quebrando o princípio da investigação fundamentada. Tirar conclusões sem evidências suficientes leva a julgamentos errados e a decisões que não refletem a realidade."
  },
  {
    "name": "Culpar (outros ou a si mesmo)",
    "description": "Dirijo minha atenção aos outros como fontes de meus sentimentos e experiências, deixando de considerar minha própria responsabilidade; ou, inversamente, responsabilizo-me pelos comportamentos e atitudes de outros.",
    "examples": ["'Meus pais são os únicos culpados por minha infelicidade.'", "'É culpa minha que meu filho tenha se casado com uma pessoa tão egoísta e descuidada.'"],
    "score": 0,
    "explanation": "Culpar outros ou a si mesmo é disfuncional porque simplifica indevidamente a complexidade das relações e eventos. Esse pensamento ignora a multiplicidade de fatores que contribuem para os resultados e viola o princípio da responsabilidade compartilhada e da interdependência nas relações humanas."
  },
  {
    "name": "E se...?",
    "description": "Fico me fazendo perguntas do tipo 'e se acontecer alguma coisa?'",
    "examples": ["'E se meu caro bater?'", "'E se eu tiver um enfarte?' 'E se meu marido me deixar?'"],
    "score": 0,
    "explanation": "O pensamento 'e se...?' é disfuncional porque foca em possibilidades hipotéticas, ignorando o presente e a probabilidade real desses eventos ocorrerem, geralmente atribuindo mais probabilidade ao que se considera ruim, sem qualquer evidência para suportar isso. Esse pensamento quebra o princípio de lidar com a realidade atual e de se concentrar em problemas concretos em vez de especulações."
  },
  {
    "name": "Comparações injustas",
    "description": "Comparo-me com outras pessoas que parecem se sair melhor do que eu e me coloco em posição de desvantagem.",
    "examples": ["'Meu pai prefere meu irmão mais velho a mim porque ele é mais inteligente do que eu.'", "'Não consigo suportar o fato de ela ter mais sucesso do que eu.'"],
    "score": 0,
    "explanation": "Comparações injustas são disfuncionais porque desconsideram as diferenças individuais e contextuais, violando o princípio da singularidade e do valor intrínseco de cada pessoa. Ao se comparar com os outros sem considerar as circunstâncias únicas de cada um, cria-se uma medida injusta que não reflete a realidade das capacidades e experiências individuais. Geralmente, a comparação se dá da seguinte forma: seus pontos fracos com os pontos fortes do outro, de tal maneira que não vê o outro como ele é de fato, mas uma versão idealizada."
  }
]

const referenceMatrix = [
  [1, 2, 3],
  [2, 3, 4],
  [3, 4, 5]
];


export default function Home() {
  const [disfunctionalThoughts, setDisfunctionalThoughts] = useState(initialArray);
  const maximumScore = disfunctionalThoughts.length * 5;
  const [currentStep, setCurrentStep] = useState(0);
  const [frequency, setFrequency] = useState(-1);
  const [intensity, setIntensity] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, percentual: 0 });
  const [showError, setShowError] = useState(false);
  const [currentScores, setCurrentScores] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const ls = localStorage.getItem("scores");
    if (ls) setCurrentScores(JSON.parse(ls));
  }, []);

  useEffect(() => {
    if (isFinished) {
      let sum = 0;
      for (let i = 0; i < disfunctionalThoughts.length; i++) {
        sum += disfunctionalThoughts[i].score;
      }
      setFinalScore({ score: sum, percentual: Number(((sum / maximumScore) * 100).toFixed(2)) });

      if (currentScores.length > 0) {
        localStorage.setItem("scores", JSON.stringify([...currentScores, sum]));
        setCurrentScores([...currentScores, sum]);
      } else {
        localStorage.setItem("scores", JSON.stringify([sum]));
      }
    }
  }, [isFinished, disfunctionalThoughts, maximumScore]);

  const getLevel = () => {
    if (finalScore.percentual <= 30) {
      return "baixo";
    } else if (finalScore.percentual > 30 && finalScore.percentual <= 70) {
      return "médio";
    } else {
      return "alto";
    }
  }

  return (
    <main className="py-8 min-h-screen">
      {
        !isFinished ? (
          <div className="p-2 flex flex-col justify-center items-center gap-8 w-full md:w-1/2 lg:w-1/3 mx-auto">
            <span><strong className="text-blue-800">Etapa:</strong> {currentStep + 1}/{disfunctionalThoughts.length}</span>
            {
              showError && (
                <span className="font-bold text-red-800 bg-red-50 p-2 rounded-xl animate-bounce">Informe corretamente a frequência e a intensidade.</span>
              )
            }
            <h2 className="relative text-2xl font-bold text-center text-blue-800">
              {disfunctionalThoughts[currentStep].name}
              <BsQuestionCircle className="ml-2 inline" onMouseEnter={() => setShowExplanation(true)} onMouseLeave={() => setShowExplanation(false)} />
              {
                showExplanation && (
                  <span className="border border-blue-800 absolute top-full left-1/2 -translate-x-1/2 font-light italic text-xs text-black w-[250px] lg:w-[300px] bg-white p-4 rounded-xl shadow text-justify">
                    {disfunctionalThoughts[currentStep].explanation}
                  </span>
                )
              }
            </h2>
            <p className="text-justify font-medium">{disfunctionalThoughts[currentStep].description}</p>
            <ul className="list-disc text-justify font-light text-green-800">
              {
                disfunctionalThoughts[currentStep].examples.map((e, i) => {
                  return <li key={i} className="mb-4">{e}</li>
                })
              }
            </ul>

            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="frequency" className="block w-full p-2 font-bold cursor-pointer">Frequência</label>
                <select
                  id="frequency"
                  className={`w-full border border-gray-700 p-2 rounded-xl ${frequency === 0 && "bg-green-50"} ${frequency === 1 && "bg-yellow-50"} ${frequency === 2 && "bg-orange-50"} ${frequency === 3 && "bg-red-50"}`}
                  value={frequency.toString()}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                >
                  <option value="-1" defaultChecked>Selecione uma opção</option>
                  <option value="0">Em nenhum momento desta semana</option>
                  <option value="1">Ocasional (1-2 dias durante esta semana)</option>
                  <option value="2">Boa parte do tempo (3-5 dias durante esta semana)</option>
                  <option value="3">Quase todo o tempo (6-7 dias durante esta semana)</option>
                </select>
              </div>
              {
                frequency !== 0 && (
                  <div>
                    <label htmlFor="intensity" className="block w-full p-2 font-bold cursor-pointer">Intensidade: <span className="font-light">Acreditei...</span></label>
                    <select
                      id="intensity"
                      className={`w-full border border-gray-700 p-2 rounded-xl ${intensity === 0 && "bg-green-50"} ${intensity === 1 && "bg-yellow-50"} ${intensity === 2 && "bg-orange-50"} ${intensity === 3 && "bg-red-50"}`}
                      value={intensity.toString()}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                    >
                      <option value="-1" defaultChecked>Selecione uma opção</option>
                      <option value="1">Um pouco (Até to 30%)</option>
                      <option value="2">Médio (31% to 70%)</option>
                      <option value="3">Muito (Mais de 70%)</option>
                    </select>
                  </div>
                )
              }
            </form>

            <div className="flex gap-2 items-center">
              {
                currentStep > 0 && (
                  <button onClick={() => setCurrentStep(currentStep - 1)} className="bg-blue-900 text-white p-2 rounded-xl hover:bg-blue-700">Voltar</button>
                )
              }
              <button onClick={() => {
                if ((frequency !== -1 && intensity !== -1) || frequency === 0) {
                  if (frequency > 0) {
                    let copy = JSON.parse(JSON.stringify(disfunctionalThoughts));
                    copy[currentStep].score = referenceMatrix[frequency - 1][intensity - 1];
                    console.log("Score encontrado: " + referenceMatrix[frequency - 1][intensity - 1]);
                    setDisfunctionalThoughts(() => copy);
                    console.log("Novo array setado")
                    console.log(disfunctionalThoughts);
                  }

                  if (currentStep < disfunctionalThoughts.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    setIsFinished(true);
                  }

                  setFrequency(-1);
                  setIntensity(-1);
                  setShowError(false);
                } else {
                  setShowError(true);
                }
              }} className="bg-blue-900 text-white p-2 rounded-xl hover:bg-blue-700">{currentStep === disfunctionalThoughts.length - 1 ? "Finalizar" : "Continuar"}</button>
            </div>
          </div>
        ) : (
          <div className="p-2 flex flex-col justify-center items-center gap-8 w-full md:w-1/2 lg:w-1/3 mx-auto">
            <h2 className="text-2xl font-bold text-center text-blue-800">Resultado</h2>
            <p className="text-justify font-medium">A sua pontuação final foi de <strong className="text-blue-800">{finalScore.score}</strong> e ela representa <strong className="text-blue-800">{finalScore.percentual}%</strong> do total possível. Isso quer dizer que você está em um nível <strong className="text-blue-800">{getLevel()}</strong> de pensamentos disfuncionais. {getLevel() === "alto" && "Procure ajuda."}</p>

            <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2">
              <PieWrapper
                labels={["Disfuncional", "Saudável"]}
                label='# de gênero'
                data={
                  [
                    finalScore.percentual,
                    100 - finalScore.percentual
                  ]
                }
                backgroundColor={["tomato", "lightgreen"]}
                borderColor={[]}
                borderWidth={1}
              />
              <LineWrapper
                labels={currentScores.map((c, i) => String(i))}
                label='# scores salvos'
                data={currentScores}
                backgroundColor={["dodgerblue"]}
                borderColor={[]}
                borderWidth={1}
              />
            </div>

          </div>
        )
      }

    </main>
  );
}
