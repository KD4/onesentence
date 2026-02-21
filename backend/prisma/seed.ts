import { PrismaClient, Level } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Skip if already seeded
  const existingQuestions = await prisma.levelQuestion.count();
  if (existingQuestions > 0) {
    console.log('Database already seeded, skipping.');
    return;
  }

  // Seed level ranges
  const levelRanges = [
    { level: Level.BEGINNER, minScore: 0, maxScore: 20 },
    { level: Level.ELEMENTARY, minScore: 21, maxScore: 40 },
    { level: Level.INTERMEDIATE, minScore: 41, maxScore: 60 },
    { level: Level.UPPER_INTERMEDIATE, minScore: 61, maxScore: 80 },
    { level: Level.ADVANCED, minScore: 81, maxScore: 100 },
  ];

  for (const range of levelRanges) {
    await prisma.levelRange.upsert({
      where: { id: levelRanges.indexOf(range) + 1 },
      update: range,
      create: range,
    });
  }
  console.log('Level ranges seeded');

  // Seed level questions
  const questions = [
    {
      orderIndex: 1,
      questionText: '다음 인사말의 의미로 가장 적절한 것은?\n"How do you do?"',
      options: [
        { optionText: '어떻게 하나요?', score: 5, orderIndex: 1 },
        { optionText: '처음 뵙겠습니다', score: 20, orderIndex: 2 },
        { optionText: '뭐 하세요?', score: 10, orderIndex: 3 },
        { optionText: '잘 지내세요?', score: 15, orderIndex: 4 },
      ],
    },
    {
      orderIndex: 2,
      questionText: '빈칸에 알맞은 것은?\n"She ___ to school every day."',
      options: [
        { optionText: 'go', score: 5, orderIndex: 1 },
        { optionText: 'goes', score: 20, orderIndex: 2 },
        { optionText: 'going', score: 10, orderIndex: 3 },
        { optionText: 'gone', score: 10, orderIndex: 4 },
      ],
    },
    {
      orderIndex: 3,
      questionText:
        '다음 문장의 의미는?\n"I couldn\'t help laughing."',
      options: [
        { optionText: '웃는 것을 도울 수 없었다', score: 5, orderIndex: 1 },
        { optionText: '웃지 않을 수 없었다', score: 20, orderIndex: 2 },
        { optionText: '웃으며 도왔다', score: 5, orderIndex: 3 },
        { optionText: '웃음을 참았다', score: 10, orderIndex: 4 },
      ],
    },
    {
      orderIndex: 4,
      questionText:
        '빈칸에 알맞은 것은?\n"If I ___ you, I would accept the offer."',
      options: [
        { optionText: 'am', score: 5, orderIndex: 1 },
        { optionText: 'was', score: 10, orderIndex: 2 },
        { optionText: 'were', score: 20, orderIndex: 3 },
        { optionText: 'be', score: 5, orderIndex: 4 },
      ],
    },
    {
      orderIndex: 5,
      questionText:
        '다음 문장에서 "What"의 역할은?\n"What surprised me was his attitude."',
      options: [
        { optionText: '목적어', score: 10, orderIndex: 1 },
        { optionText: '주어 (명사절)', score: 20, orderIndex: 2 },
        { optionText: '보어', score: 10, orderIndex: 3 },
        { optionText: '부사절', score: 5, orderIndex: 4 },
      ],
    },
  ];

  for (const q of questions) {
    const { options, ...questionData } = q;
    const question = await prisma.levelQuestion.create({
      data: {
        ...questionData,
        options: {
          create: options,
        },
      },
    });
    console.log(`Question ${question.id} seeded`);
  }

  // Seed sentences (7 days per level)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sentenceData: {
    level: Level;
    sentences: {
      englishText: string;
      koreanTranslation: string;
      keyExpression: string;
      explanation: string;
    }[];
  }[] = [
    {
      level: Level.BEGINNER,
      sentences: [
        {
          englishText: 'Good morning! How are you today?',
          koreanTranslation: '좋은 아침이에요! 오늘 기분이 어때요?',
          keyExpression: 'How are you?',
          explanation:
            '일상에서 가장 많이 쓰이는 안부 인사입니다. "How are you today?"처럼 today를 붙이면 더 자연스럽습니다.',
        },
        {
          englishText: 'Can I have a glass of water, please?',
          koreanTranslation: '물 한 잔 주시겠어요?',
          keyExpression: 'Can I have ~?',
          explanation:
            '무언가를 요청할 때 사용하는 기본 표현입니다. please를 붙이면 더 공손합니다.',
        },
        {
          englishText: 'I like reading books in my free time.',
          koreanTranslation: '저는 여가 시간에 책 읽는 것을 좋아해요.',
          keyExpression: 'in my free time',
          explanation:
            '"여가 시간에"라는 뜻으로 취미를 이야기할 때 자주 사용합니다.',
        },
        {
          englishText: 'The weather is really nice today.',
          koreanTranslation: '오늘 날씨가 정말 좋네요.',
          keyExpression: 'The weather is ~',
          explanation: '날씨를 표현하는 기본 문형입니다. nice, cold, hot, warm 등 다양한 형용사를 넣을 수 있습니다.',
        },
        {
          englishText: 'What time does the store close?',
          koreanTranslation: '가게가 몇 시에 문을 닫나요?',
          keyExpression: 'What time does ~ ?',
          explanation: '시간을 물어보는 기본 의문문입니다. does + 동사원형 구조를 기억하세요.',
        },
        {
          englishText: 'I need to go to the supermarket.',
          koreanTranslation: '슈퍼마켓에 가야 해요.',
          keyExpression: 'need to ~',
          explanation: '"~해야 한다"는 의미로 have to와 비슷하지만 좀 더 부드러운 표현입니다.',
        },
        {
          englishText: 'This is my first time visiting Korea.',
          koreanTranslation: '한국을 방문하는 것은 이번이 처음이에요.',
          keyExpression: 'my first time -ing',
          explanation: '"~하는 것이 처음이다"라는 표현으로, time 뒤에 동명사(-ing)를 씁니다.',
        },
      ],
    },
    {
      level: Level.ELEMENTARY,
      sentences: [
        {
          englishText: 'I\'ve been learning English for three years.',
          koreanTranslation: '저는 3년 동안 영어를 배워 왔어요.',
          keyExpression: 'have been -ing for ~',
          explanation:
            '현재완료 진행형으로, 과거부터 지금까지 계속 진행 중인 일을 표현합니다.',
        },
        {
          englishText: 'Could you tell me how to get to the station?',
          koreanTranslation: '역까지 어떻게 가는지 알려주시겠어요?',
          keyExpression: 'Could you tell me ~?',
          explanation: '정중하게 정보를 요청하는 간접 의문문 표현입니다.',
        },
        {
          englishText: 'I used to play soccer when I was young.',
          koreanTranslation: '어렸을 때 축구를 하곤 했어요.',
          keyExpression: 'used to ~',
          explanation: '과거의 습관이나 상태를 나타내는 표현으로, 지금은 더 이상 하지 않음을 암시합니다.',
        },
        {
          englishText: 'It depends on the situation.',
          koreanTranslation: '상황에 따라 다릅니다.',
          keyExpression: 'depend on ~',
          explanation: '"~에 달려 있다, ~에 따라 다르다"라는 뜻의 매우 유용한 표현입니다.',
        },
        {
          englishText: 'She is not only smart but also kind.',
          koreanTranslation: '그녀는 똑똑할 뿐만 아니라 친절하기도 해요.',
          keyExpression: 'not only A but also B',
          explanation: '"A뿐만 아니라 B도"라는 상관접속사 표현입니다.',
        },
        {
          englishText: 'I\'m looking forward to seeing you again.',
          koreanTranslation: '다시 만나기를 기대하고 있어요.',
          keyExpression: 'look forward to -ing',
          explanation: '"~을 기대하다"라는 뜻으로, to 뒤에 동명사(-ing)가 온다는 점에 주의하세요.',
        },
        {
          englishText: 'Would you mind opening the window?',
          koreanTranslation: '창문을 열어 주시겠어요?',
          keyExpression: 'Would you mind -ing?',
          explanation: '공손하게 부탁하는 표현입니다. "괜찮으시면" 이라는 뉘앙스가 있습니다.',
        },
      ],
    },
    {
      level: Level.INTERMEDIATE,
      sentences: [
        {
          englishText: 'The project turned out to be more challenging than expected.',
          koreanTranslation: '그 프로젝트는 예상보다 더 어려운 것으로 판명되었어요.',
          keyExpression: 'turn out to be ~',
          explanation: '"~인 것으로 밝혀지다/판명되다"라는 뜻으로, 결과를 말할 때 사용합니다.',
        },
        {
          englishText: 'Had it not been for your help, I would have failed.',
          koreanTranslation: '당신의 도움이 없었다면, 저는 실패했을 거예요.',
          keyExpression: 'Had it not been for ~',
          explanation: '가정법 과거완료의 도치 구문입니다. If it had not been for와 같은 의미입니다.',
        },
        {
          englishText: 'I can\'t help but wonder what would have happened.',
          koreanTranslation: '무슨 일이 일어났을지 궁금하지 않을 수 없어요.',
          keyExpression: 'can\'t help but + 동사원형',
          explanation: '"~하지 않을 수 없다"는 표현으로, can\'t help -ing과 같은 의미입니다.',
        },
        {
          englishText: 'The more you practice, the better you get.',
          koreanTranslation: '연습할수록, 더 잘하게 됩니다.',
          keyExpression: 'The 비교급 ~, the 비교급 ~',
          explanation: '"~하면 할수록, 더 ~하다"는 비례 구문입니다.',
        },
        {
          englishText: 'It goes without saying that health is important.',
          koreanTranslation: '건강이 중요하다는 것은 두말할 필요도 없어요.',
          keyExpression: 'It goes without saying that ~',
          explanation: '"~은 말할 필요도 없다, 두말하면 잔소리"라는 관용 표현입니다.',
        },
        {
          englishText: 'I\'m having second thoughts about the decision.',
          koreanTranslation: '그 결정에 대해 다시 생각하고 있어요.',
          keyExpression: 'have second thoughts',
          explanation: '"다시 생각하다, 마음이 바뀌다"라는 뜻의 관용 표현입니다.',
        },
        {
          englishText: 'Not until I read the article did I understand the issue.',
          koreanTranslation: '그 기사를 읽고 나서야 그 문제를 이해했어요.',
          keyExpression: 'Not until ~ did I ...',
          explanation: '부정 부사구가 문두에 오면서 도치가 일어난 강조 구문입니다.',
        },
      ],
    },
    {
      level: Level.UPPER_INTERMEDIATE,
      sentences: [
        {
          englishText: 'The findings lend credibility to the hypothesis that was previously dismissed.',
          koreanTranslation: '그 발견은 이전에 무시되었던 가설에 신뢰성을 부여합니다.',
          keyExpression: 'lend credibility to ~',
          explanation: '"~에 신뢰성을 부여하다"라는 뜻으로, 학술적이거나 격식 있는 맥락에서 사용됩니다.',
        },
        {
          englishText: 'She made it a point to arrive early for every meeting.',
          koreanTranslation: '그녀는 모든 회의에 일찍 도착하는 것을 원칙으로 삼았어요.',
          keyExpression: 'make it a point to ~',
          explanation: '"~하는 것을 원칙으로 삼다, 꼭 ~하다"라는 결심을 나타내는 표현입니다.',
        },
        {
          englishText: 'The policy, controversial as it may be, has yielded positive results.',
          koreanTranslation: '논란이 있을 수 있지만, 그 정책은 긍정적인 결과를 가져왔습니다.',
          keyExpression: '형용사 + as it may be',
          explanation: '양보 구문으로, "비록 ~하더라도"라는 의미입니다. though와 비슷한 역할을 합니다.',
        },
        {
          englishText: 'In hindsight, we should have approached the problem differently.',
          koreanTranslation: '돌이켜보면, 우리는 그 문제에 다르게 접근했어야 했어요.',
          keyExpression: 'in hindsight',
          explanation: '"돌이켜보면, 지나고 보니"라는 뜻으로 과거 결정을 되돌아볼 때 사용합니다.',
        },
        {
          englishText: 'His argument, though well-articulated, failed to address the core issue.',
          koreanTranslation: '그의 주장은 잘 표현되었지만, 핵심 문제를 다루지 못했습니다.',
          keyExpression: 'well-articulated',
          explanation: '"잘 표현된, 명확히 설명된"이라는 뜻의 복합 형용사입니다.',
        },
        {
          englishText: 'The company is on the verge of a major breakthrough.',
          koreanTranslation: '그 회사는 큰 돌파구를 앞두고 있습니다.',
          keyExpression: 'on the verge of ~',
          explanation: '"~의 직전에, ~할 즈음에"라는 뜻으로 중요한 변화를 앞두고 있을 때 씁니다.',
        },
        {
          englishText: 'It remains to be seen whether the new strategy will pay off.',
          koreanTranslation: '새로운 전략이 성과를 거둘지는 두고 봐야 합니다.',
          keyExpression: 'It remains to be seen ~',
          explanation: '"~은 두고 봐야 한다"라는 뜻으로, 아직 결과가 불확실할 때 사용합니다.',
        },
      ],
    },
    {
      level: Level.ADVANCED,
      sentences: [
        {
          englishText: 'The implications of this paradigm shift are far-reaching and multifaceted.',
          koreanTranslation: '이 패러다임 전환의 함의는 광범위하고 다면적입니다.',
          keyExpression: 'far-reaching and multifaceted',
          explanation: 'far-reaching은 "광범위한", multifaceted는 "다면적인"이라는 뜻으로, 학술/비즈니스 맥락에서 자주 사용됩니다.',
        },
        {
          englishText: 'Notwithstanding the initial setbacks, the initiative has proven remarkably resilient.',
          koreanTranslation: '초기 어려움에도 불구하고, 그 이니셔티브는 놀라울 정도로 회복력이 있음을 증명했습니다.',
          keyExpression: 'notwithstanding',
          explanation: '"~에도 불구하고"라는 격식체 전치사/접속사입니다. despite, in spite of와 같은 의미입니다.',
        },
        {
          englishText: 'The dichotomy between theory and practice often undermines policy implementation.',
          koreanTranslation: '이론과 실제 사이의 이분법은 종종 정책 시행을 약화시킵니다.',
          keyExpression: 'dichotomy between A and B',
          explanation: '"A와 B 사이의 이분법/양분"이라는 뜻의 학술적 표현입니다.',
        },
        {
          englishText: 'One would be hard-pressed to find a more eloquent articulation of the problem.',
          koreanTranslation: '그 문제에 대한 더 유창한 표현을 찾기는 어려울 것입니다.',
          keyExpression: 'be hard-pressed to ~',
          explanation: '"~하기 어렵다"라는 뜻의 격식적 표현입니다.',
        },
        {
          englishText: 'The author deftly juxtaposes modernity with tradition to highlight cultural tensions.',
          koreanTranslation: '저자는 문화적 긴장을 부각하기 위해 현대성과 전통을 능숙하게 병치합니다.',
          keyExpression: 'juxtapose A with B',
          explanation: '"A를 B와 병치/대조하다"라는 뜻으로, 문학 비평이나 분석에서 자주 사용됩니다.',
        },
        {
          englishText: 'Such a nuanced perspective is rarely encountered in mainstream discourse.',
          koreanTranslation: '이렇게 미묘한 관점은 주류 담론에서 좀처럼 만나기 어렵습니다.',
          keyExpression: 'nuanced perspective',
          explanation: '"미묘한/섬세한 관점"이라는 뜻으로, 깊이 있는 분석을 칭찬할 때 사용합니다.',
        },
        {
          englishText: 'The unprecedented convergence of these factors precipitated an existential crisis.',
          koreanTranslation: '이러한 요인들의 전례 없는 수렴이 존재론적 위기를 촉발했습니다.',
          keyExpression: 'precipitate a crisis',
          explanation: '"위기를 촉발하다/야기하다"라는 뜻입니다. precipitate는 "급격히 초래하다"는 의미의 격식 동사입니다.',
        },
      ],
    },
  ];

  for (const { level, sentences } of sentenceData) {
    for (let i = 0; i < sentences.length; i++) {
      const scheduledDate = new Date(today);
      scheduledDate.setDate(today.getDate() - (sentences.length - 1 - i));

      await prisma.sentence.create({
        data: {
          ...sentences[i],
          level,
          scheduledDate,
        },
      });
    }
    console.log(`${level} sentences seeded`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
