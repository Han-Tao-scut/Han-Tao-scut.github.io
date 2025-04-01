---
title: RoseTTAFold All-Atom
date: 2025-04-01 22:23:54
tags:
---

## Introduction

![image-20241209140858454](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20241209140858454.png)

RoseTTAFold All-Atom 是一个生物分子结构预测神经网络，可以预测广泛的生物分子组装体，包括蛋白质、核酸、小分子、共价修饰和金属，具体内容请参阅[RFAA 论文](https://www.science.org/doi/10.1126/science.adl2528)。

RFAA 并不是在所有情况下都准确，但它能产生有用的误差估计，帮助用户识别准确的预测结果。以下是设置和使用该模型的说明。

## Installation

由于 STO 的限制，目前版本的 STO（截至 2024 年 12 月 8 日）不支持从 [https://hub.docker.com](https://hub.docker.com/) 获取镜像。如果您希望在个人计算机上运行 RFAA，您可以使用 Docker 镜像：`mhkramer/rosettafold-all-atom`。请注意，该 Docker 镜像不包含必要的数据库和 BLAST。因此，您需要按照 [此 GitHub 仓库](https://github.com/baker-laboratory/RoseTTAFold-All-Atom/tree/main) 中提供的说明下载它们。

在 STO 环境中，您可以 [Rosettafold-All-Atom](https://cloud.stomics.tech/library/#/image/image-detail/i0L5ob97Rkz89?zone=sz) 访问一个已经在 STO 环境中安装并测试过的镜像。

## Usage

我将介绍如何在 STO 中使用 Rosettafold-All-Atom 进行蛋白质结构预测。如果遇到任何错误，请联系 hantao@genomics.cn。

### Installation

Image_URL:  `public-library/hantao_a2c609c29fa44ae6b038fb9ad929f420_public:latest`

所需的数据库已经上传，您可以直接使用该镜像进行结构预测。

### Running Rosettafold-All-ATOM

根据当前STO计费规则，我建议在使用云资源时采用将MSA（多序列比对）和预测步骤分开的策略。这种方法可以根据每个阶段的具体需求来分配资源，如CPU、GPU和内存。具体来说，在MSA过程中，由于不需要进行预测，您可以选择不分配GPU资源，而是将更多的CPU和内存分配给加速MSA步骤。一旦MSA完成，您可以切换到GPU资源来进行预测阶段，同时将CPU资源减少到最低必要水平。

这样做的好处是：

1. **资源优化**：避免了在不需要GPU资源的阶段浪费云计算成本，提高了资源利用率。
2. **降低成本**：云资源按使用时长计费，通过合理分配资源，可以有效降低不必要的费用。
3. **灵活性**：根据每个阶段的需求进行资源调整，可以提升计算效率，并且灵活应对不同的工作负载。

您可以在STO环境中实现这种策略，通过自动化脚本或手动切换资源配置来优化工作流程和成本控制。

**注意：** 由于STO的限制，该镜像无法在工作流中使用，只能在分析阶段使用。主要原因是STO的默认Shell不是Bash，因此您必须首先执行 `bash` 命令切换到正确的Shell。

#### Upload your query

请将您的查询文件加载到目录 `/usr/local/bin/RoseTTAFold-All-Atom/inputs` 中。您可以直接复制文件或创建符号链接。

**注意：**

每个文件必须只包含一个序列。为此，您应该拆分您的FASTA文件，使每个文件只包含一个序列。您可以使用以下命令来完成这一操作：

```shell
seqkit split2 your_query.fasta -s 1 -O /usr/local/bin/RoseTTAFold-All-Atom/inputs
```

这个命令将每个序列分开，并确保每个输出文件只包含一个序列。

![image-20241209140913789](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20241209140913789.png)

#### Running MSA

在 `/usr/local/bin/RoseTTAFold-All-Atom` 目录中执行以下脚本：

```
bash


复制代码
python rfaa_batch_msa.py
```

此脚本将自动对存储在 `/usr/local/bin/RoseTTAFold-All-Atom/inputs` 中的查询进行多序列比对（MSA）。MSA 输出将保存在 `/usr/local/bin/RoseTTAFold-All-Atom/outputs` 目录中，并根据查询进行组织。

##### 可选：

您可以根据任务和可用资源调整并行任务数量和CPU分配。

**Number of parallel tasks**

要修改并行任务数，您可以使用以下命令来设置并行任务的数量：

```shell
sed -i 's|max_workers=2|max_workers=tasks_wanted|g' /usr/local/bin/RoseTTAFold-All-Atom/rfaa_batch_msa.py
```

 `tasks_wanted`  是并行任务的数量。

**Number of CPUs:**

要调整 CPU 数量，请按以下方式修改配置：

```shell
sed -i 's|num_cpus: 4|num_cpus: cpu_assigned|g' /usr/local/bin/RoseTTAFold-All-Atom/rf2aa/config/inference/base.yaml
```

其中 `cpu_assigned` 是您希望分配的 CPU 数量。

（默认值为 4，这是由 Baker 实验室指定的，但您可以增加 CPU 数量以加速过程，例如使用 11 个 CPU。）

每个查询的结果将按如下方式存储：

![image-20241209140925346](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20241209140925346.png)

**Note:**

![image-20241208155755524](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20241208155755524.png)

该错误是正常的，不必过于担心。实际上，您可以将其视为过程正常运行的一个标志。

#### Running Prediction

由于预测步骤需要 GPU，如果您的终端无法访问 GPU，您应将文件保存在 `/usr/local/bin/RoseTTAFold-All-Atom/inputs` 和 `/usr/local/bin/RoseTTAFold-All-Atom/results` 目录下，然后使用可以访问 GPU 的终端。上传在 MSA 阶段保存的文件到相应目录非常重要。脚本 `rfaa_batch_predict.py` 会根据输入文件夹中的查询检查 MSA 结果的存在。如果找不到相应的文件，脚本将重新运行 MSA，这可能会导致不必要的资源消耗。

一旦您上传了适当的文件，请在 `/usr/local/bin/RoseTTAFold-All-Atom` 目录下运行以下脚本：

```shell
python rfaa_batch_predict.py
```

##### Optional：

根据任务需求和可用资源调整并行任务数和 CPU 资源。

**Number of parallel tasks:**

要调整并行任务数，请使用以下命令：

```shell
sed -i 's|max_workers=2|max_workers=tasks_wanted|g' /usr/local/bin/RoseTTAFold-All-Atom/rfaa_batch_predict.py
```

其中，`tasks_wanted` 是您希望执行的并行任务数。

**GPU Memory:**

请注意，大约 300 个氨基酸（AA）的查询大约需要 10GB 的 GPU 内存。您应根据可用的 GPU 内存调整并行任务数。

输出将保存在 `/usr/local/bin/RoseTTAFold-All-Atom/results` 目录，并按以下方式组织：

![image-20241209140944073](https://raw.githubusercontent.com/Han-Tao-scut/photo/master/image-20241209140944073.png)

- 预测结构的 PDB 文件（B因子表示每个位置的预测LDDT值）
- 存储有置信度指标的 PyTorch 文件（可以通过 `torch.load(file, map_location="cpu")` 加载）