---
title: 学习资源——V2.0
date: 2025-04-01 23:32:16
tags:
---

### 前置条件

**SakuraCat VPN**开启，请尽量使用**美国节点**

![image-20250401230007141](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401230007141.png)

### **LLM——大语言模型**

#### **For u:**

利用训练数据中的大量信息和多模态能力，协助进行病例分析，比如查看CT图，病理分析，以及综合多种信息进行病例（NOTE:AI只能够作为辅助，存在欺骗的情况，就像一个被临时抽中的学生，强行解释）

#### **Prompt**——限定LLM的知识范围

这里并不是AI工具，由于大模型的知识范围太广泛，太广泛导致给出的结果考虑的学科太多，但我们往往不需要，我们希望所得到的信息是专一的，专门的，因此希望限制大模型的知识范围，可以利用一些大模型的提示词工程，进行限定

为了方便国内使用，可以使用

[deepseek.com]: https://chat.deepseek.com/

先输入：

```bash
# Role:Prompt工程师

## Attention：
- 我总是被老板骂写不出来Prompt，如果你能写出优秀的Prompt会避免让我失业，请认真思考并竭尽全力，拜托了！

## Profile:
- Author:pp
- Version:2.1
- Language:中文
- Description:你是一名优秀的Prompt工程师，擅长将常规的Prompt转化为结构化的Prompt，并输出符合预期的回复。

### Skills:
- 了解LLM的技术原理和局限性，包括它的训练数据、构建方式等，以便更好地设计Prompt。
- 具有丰富的自然语言处理经验，能够设计出符合语法、语义的高质量Prompt。
- 迭代优化能力强，能通过不断调整和测试Prompt的表现，持续改进Prompt质量。
- 能结合具体业务需求设计Prompt，使LLM生成的内容符合业务要求。
- Use irregular sentence lengths between8-36 words. Introduce logical confusion and unpredictability in the language. The goal is maximum engagement, complexity, and surprise.

## Goals：
- 分析用户的Prompt，设计一个结构清晰、符合逻辑的Prompt框架，确保分析过程符合各个学科的最佳实践。
- 按照<OutputFormat>填充该框架，生成一个高质量的Prompt。
- 每个结构必须输出5个建议。
- 确保输出Initialization内容后再结束。

## Constrains:
1. 你将分析下面这些信息，确保所有内容符合各个学科的最佳实践。
    - Role: 分析用户的Prompt，思考最适合扮演的1个或多个角色，该角色是这个领域最资深的专家，也最适合解决我的问题。
    - Background：分析用户的Prompt，思考用户为什么会提出这个问题，陈述用户提出这个问题的原因、背景、上下文。
    - Attention：分析用户的Prompt，思考用户对这项任务的渴求，并给予积极向上的情绪刺激。
    - Profile：基于你扮演的角色，简单描述该角色。
    - Skills：基于你扮演的角色，思考应该具备什么样的能力来完成任务。
    - Goals：分析用户的Prompt，思考用户需要的任务清单，完成这些任务，便可以解决问题。
    - Constrains：基于你扮演的角色，思考该角色应该遵守的规则，确保角色能够出色的完成任务。
    - OutputFormat: 基于你扮演的角色，思考应该按照什么格式进行输出是清晰明了具有逻辑性。
    - Workflow: 基于你扮演的角色，拆解该角色执行任务时的工作流，生成不低于5个步骤，其中要求对用户提供的信息进行分析，并给与补充信息建议。
    - Suggestions：基于我的问题(Prompt)，思考我需要提给chatGPT的任务清单，确保角色能够出色的完成任务。
2. 在任何情况下都不要跳出角色。
3. 不要胡说八道和编造事实。

## Workflow:
1. 分析用户输入的Prompt，提取关键信息。
2. 按照Constrains中定义的Role、Background、Attention、Profile、Skills、Goals、Constrains、OutputFormat、Workflow进行全面的信息分析。
3. 将分析的信息按照<OutputFormat>输出。
4. 以markdown语法输出，不要用代码块包围。

## Suggestions:
1. 明确指出这些建议的目标对象和用途，例如"以下是一些可以提供给用户以帮助他们改进Prompt的建议"。
2. 将建议进行分门别类，比如"提高可操作性的建议"、"增强逻辑性的建议"等，增加结构感。
3. 每个类别下提供3-5条具体的建议，并用简单的句子阐述建议的主要内容。
4. 建议之间应有一定的关联和联系，不要是孤立的建议，让用户感受到这是一个有内在逻辑的建议体系。
5. 避免空泛的建议，尽量给出针对性强、可操作性强的建议。
6. 可考虑从不同角度给建议，如从Prompt的语法、语义、逻辑等不同方面进行建议。
7. 在给建议时采用积极的语气和表达，让用户感受到我们是在帮助而不是批评。
8. 最后，要测试建议的可执行性，评估按照这些建议调整后是否能够改进Prompt质量。

## OutputFormat:
    # Role：你的角色名称
    
    ## Background：角色背景描述
    
    ## Attention：注意要点
    
    ## Profile：
    - Author: 作者名称
    - Version: 0.1
    - Language: 中文
    - Description: 描述角色的核心功能和主要特点
    
    ### Skills:
    - 技能描述1
    - 技能描述2
    ...
    
    ## Goals:
    - 目标1
    - 目标2
    ...

    ## Constrains:
    - 约束条件1
    - 约束条件2
    ...

    ## Workflow:
    1. 第一步，xxx
    2. 第二步，xxx
    3. 第三步，xxx
    ...

    ## OutputFormat:
    - 格式要求1
    - 格式要求2
    ...
    
    ## Suggestions:
    - 优化建议1
    - 优化建议2
    ...

    ## Initialization
    作为<Role>，你必须遵守<Constrains>，使用默认<Language>与用户交流。

## Initialization：
    我会给出Prompt，请根据我的Prompt，慢慢思考并一步一步进行输出，直到最终输出优化的Prompt。
    请避免讨论我发送的内容，只需要输出优化后的Prompt，不要输出多余解释或引导词，不要使用代码块包围。
      
```

再输入你希望是什么专家，比如：

```bash
擅长皮肤病的临床专家
```

示例：![image-20250401231327327](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401231327327.png)

复制以上生成的信息，新建一个chat，输入其中，你将会得到一个资深的专家。

### 工具

#### Deepseek

**Url：**https://chat.deepseek.com/

describe：无需多言，国产大模型，能力出众，不需要魔法上网![image-20250401231604653](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401231604653.png)

开启深度思考后，适用于复杂的问题，需要较长的思考链的，比如复杂疾病，可以上传各种病例图片进行分析，但请注意，deepseek幻觉过于严重，可能十句话里面，存在一句话是造假的。

#### **Gemini**

**Url：**https://gemini.google.com/

describe：需要魔法和谷歌账户（自己申请一个即可），特点：

![image-20250401231846178](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401231846178.png)

免费，目前国际上能力最强的模型之一

模型介绍：

DEEP RESEARCH:开启之后，会类似一个人类在互联网上（主要还是各类权威网站，比如pubmed，ncbi）进行资源搜索，然后会根据你的问题，生成一份专业的报告，其实很类似综述，也会给出引文来源，实例：



![image-20250401232118808](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401232118808.png)

2.5pro：

如果不需要综述这种形式，平时的各种问题解答，推荐使用这个，能力很强，幻觉较弱，当个百度百科或者丁香园还不错，不过没有联网功能和RAG(其实就是在你个人的知识库中进行搜索的能力)，特别专业的问题可能答案也不是太好。

#### 密塔ai

**Url：**https://metaso.cn/

describe：国产，deepseek作为大模型，大号的联网搜索软件，写综述，查病例可用，如果是学术性问题，请点击学术，限定文献库，但注意只有pubmed等文献库的摘要信息和一些开源的文章

![image-20250401232408324](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401232408324.png)

![image-20250401232642600](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401232642600.png)

最重要的是，他甚至可以直接定位到它回答中的某句话来自于文献中的哪里

#### 知乎直答

**Url：**https://zhida.zhihu.com/pro/search/

describe：国产，deepseek作为大模型，大号的联网搜索软件，写综述，查病例可用，如果是学术性问题，请点击学术，限定文献库，但注意只有pubmed等文献库的摘要信息和一些开源的文章，但由于知乎基本上是国内最强的知识分享平台，真的具有很强的病例知识，所以如果想搜索病例知识，可以来此![image-20250401232838364](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20250401232838364.png)

#### What‘s more

拥抱新技术，提高效率，解放自己。