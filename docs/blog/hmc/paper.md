Title: mHC: Manifold-Constrained Hyper-Connections

URL Source: https://www.arxiv.org/html/2512.24880

Markdown Content:
Yixuan Wei  Huanqi Cao  Chenggang Zhao  Chengqi Deng  Jiashi Li  Damai Dai  Huazuo Gao  Jiang Chang  Kuai Yu  Liang Zhao  Shangyan Zhou  Zhean Xu  Zhengyan Zhang  Wangding Zeng  Shengding Hu  Yuqing Wang  Jingyang Yuan  Lean Wang  Wenfeng Liang 

DeepSeek-AI

###### Abstract

Recently, studies exemplified by Hyper-Connections (HC) have extended the ubiquitous residual connection paradigm established over the past decade by expanding the residual stream width and diversifying connectivity patterns. While yielding substantial performance gains, this diversification fundamentally compromises the identity mapping property intrinsic to the residual connection, which causes severe training instability and restricted scalability, and additionally incurs notable memory access overhead. To address these challenges, we propose Manifold-Constrained Hyper-Connections (m HC), a general framework that projects the residual connection space of HC onto a specific manifold to restore the identity mapping property, while incorporating rigorous infrastructure optimization to ensure efficiency. Empirical experiments demonstrate that m HC is effective for training at scale, offering tangible performance improvements and superior scalability. We anticipate that m HC, as a flexible and practical extension of HC, will contribute to a deeper understanding of topological architecture design and suggest promising directions for the evolution of foundational models.

![Image 1: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x1.png)

Figure 1: Illustrations of Residual Connection Paradigms. This figure compares the structural design of (a) standard Residual Connection, (b) Hyper-Connections (HC), and (c) our proposed Manifold-Constrained Hyper-Connections (m HC). Unlike the unconstrained HC, m HC focuses on optimizing the residual connection space by projecting the matrices onto a constrained manifold to ensure stability. 

###### Contents

1.   [1 Introduction](https://arxiv.org/html/2512.24880v2#S1 "In mHC: Manifold-Constrained Hyper-Connections")
2.   [2 Related Works](https://arxiv.org/html/2512.24880v2#S2 "In mHC: Manifold-Constrained Hyper-Connections")
    1.   [2.1 Micro Design](https://arxiv.org/html/2512.24880v2#S2.SS1 "In 2 Related Works ‣ mHC: Manifold-Constrained Hyper-Connections")
    2.   [2.2 Macro Design](https://arxiv.org/html/2512.24880v2#S2.SS2 "In 2 Related Works ‣ mHC: Manifold-Constrained Hyper-Connections")

3.   [3 Preliminary](https://arxiv.org/html/2512.24880v2#S3 "In mHC: Manifold-Constrained Hyper-Connections")
    1.   [3.1 Numerical Instability](https://arxiv.org/html/2512.24880v2#S3.SS1 "In 3 Preliminary ‣ mHC: Manifold-Constrained Hyper-Connections")
    2.   [3.2 System Overhead](https://arxiv.org/html/2512.24880v2#S3.SS2 "In 3 Preliminary ‣ mHC: Manifold-Constrained Hyper-Connections")

4.   [4 Method](https://arxiv.org/html/2512.24880v2#S4 "In mHC: Manifold-Constrained Hyper-Connections")
    1.   [4.1 Manifold-Constrained Hyper-Connections](https://arxiv.org/html/2512.24880v2#S4.SS1 "In 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")
    2.   [4.2 Parameterization and Manifold Projection](https://arxiv.org/html/2512.24880v2#S4.SS2 "In 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")
    3.   [4.3 Efficient Infrastructure Design](https://arxiv.org/html/2512.24880v2#S4.SS3 "In 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")
        1.   [4.3.1 Kernel Fusion](https://arxiv.org/html/2512.24880v2#S4.SS3.SSS1 "In 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")
        2.   [4.3.2 Recomputing](https://arxiv.org/html/2512.24880v2#S4.SS3.SSS2 "In 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")
        3.   [4.3.3 Overlapping Communication in DualPipe](https://arxiv.org/html/2512.24880v2#S4.SS3.SSS3 "In 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")

5.   [5 Experiments](https://arxiv.org/html/2512.24880v2#S5 "In mHC: Manifold-Constrained Hyper-Connections")
    1.   [5.1 Experimental Setup](https://arxiv.org/html/2512.24880v2#S5.SS1 "In 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections")
    2.   [5.2 Main Results](https://arxiv.org/html/2512.24880v2#S5.SS2 "In 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections")
    3.   [5.3 Scaling Experiments](https://arxiv.org/html/2512.24880v2#S5.SS3 "In 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections")
    4.   [5.4 Stability Analysis](https://arxiv.org/html/2512.24880v2#S5.SS4 "In 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections")

6.   [6 Conclusion and Outlook](https://arxiv.org/html/2512.24880v2#S6 "In mHC: Manifold-Constrained Hyper-Connections")
7.   [A Appendix](https://arxiv.org/html/2512.24880v2#A1 "In mHC: Manifold-Constrained Hyper-Connections")
    1.   [A.1 Detailed Model Specifications and Hyper-parameters.](https://arxiv.org/html/2512.24880v2#A1.SS1 "In Appendix A Appendix ‣ mHC: Manifold-Constrained Hyper-Connections")

1 Introduction
--------------

Deep neural network architectures have undergone rapid evolution since the introduction of ResNets (he2016deep). As illustrated in Fig. [1](https://arxiv.org/html/2512.24880v2#S0.F1 "Figure 1 ‣ mHC: Manifold-Constrained Hyper-Connections")(a), the structure of a single-layer can be formulated as follows:

𝐱 l+1=𝐱 l+ℱ​(𝐱 l,𝒲 l),\mathbf{x}_{l+1}=\mathbf{x}_{l}+\mathcal{F}(\mathbf{x}_{l},\mathcal{W}_{l}),(1)

where 𝐱 l\mathbf{x}_{l} and 𝐱 l+1\mathbf{x}_{l+1} denote the C C-dimensional input and output of the l l-th layer, respectively, and ℱ\mathcal{F} represents the residual function. Although the residual function ℱ\mathcal{F} has evolved over the past decade to include various operations such as convolution, attention mechanisms, and feed forward networks, the paradigm of the residual connection has maintained its original form. Accompanying the progression of Transformer (vaswani2017attention) architecture, this paradigm has currently established itself as a fundamental design element in large language models (LLMs) (brown2020language; touvron2023llama; liu2024deepseek_v3).

This success is primarily attributed to the concise form of the residual connection. More importantly, early research (he2016identity) revealed that the identity mapping property of the residual connection maintains stability and efficiency during large-scale training. By recursively extending the residual connection across multiple layers, Eq. ([1](https://arxiv.org/html/2512.24880v2#S1.E1 "Equation 1 ‣ 1 Introduction ‣ mHC: Manifold-Constrained Hyper-Connections")) yields:

𝐱 L=𝐱 l+∑i=l L−1 ℱ​(𝐱 i,𝒲 i),\mathbf{x}_{L}=\mathbf{x}_{l}+\sum_{i=l}^{L-1}\mathcal{F}(\mathbf{x}_{i},\mathcal{W}_{i}),(2)

where L L and l l correspond to deeper and shallower layers, respectively. The term identity mapping refers to the component 𝐱 l\mathbf{x}_{l} itself, which emphasizes the property that the signal from the shallower layer maps directly to the deeper layer without any modification.

Recently, studies exemplified by Hyper-Connections (HC) (zhu2024hyper) have introduced a new dimension to the residual connection and empirically demonstrated its performance potential. The single-layer architecture of HC is illustrated in Fig. [1](https://arxiv.org/html/2512.24880v2#S0.F1 "Figure 1 ‣ mHC: Manifold-Constrained Hyper-Connections")(b). By expanding the width of the residual stream and enhancing connection complexity, HC significantly increases topological complexity without altering the computational overhead of individual units regarding FLOPs. Formally, single-layer propagation in HC is defined as:

𝐱 l+1=ℋ l res​𝐱 l+ℋ l post⊤​ℱ​(ℋ l pre​𝐱 l,𝒲 l),\mathbf{x}_{l+1}=\mathcal{H}_{l}^{\mathrm{res}}\mathbf{x}_{l}+\mathcal{H}_{l}^{\mathrm{post}\,\top}\mathcal{F}(\mathcal{H}_{l}^{\mathrm{pre}}\mathbf{x}_{l},\mathcal{W}_{l}),(3)

where 𝐱 l\mathbf{x}_{l} and 𝐱 l+1\mathbf{x}_{l+1} denote the input and output of the l l-th layer, respectively. Unlike the formulation in Eq. ([1](https://arxiv.org/html/2512.24880v2#S1.E1 "Equation 1 ‣ 1 Introduction ‣ mHC: Manifold-Constrained Hyper-Connections")), the feature dimension of 𝐱 l\mathbf{x}_{l} and 𝐱 l+1\mathbf{x}_{l+1} is expanded from C C to n×C n\times C, where n n is the expansion rate. The term ℋ l res∈ℝ n×n\mathcal{H}_{l}^{\mathrm{res}}\in\mathbb{R}^{n\times n} represents a learnable mapping that mixes features within the residual stream. Also as a learnable mapping, ℋ l pre∈ℝ 1×n\mathcal{H}_{l}^{\mathrm{pre}}\in\mathbb{R}^{1\times n} aggregates features from the n​C nC-dim stream into a C C-dim layer input, and conversely, ℋ l post∈ℝ 1×n\mathcal{H}_{l}^{\mathrm{post}}\in\mathbb{R}^{1\times n} maps the layer output back onto the stream.

However, as the training scale increases, HC introduces potential risks of instability. The primary concern is that the unconstrained nature of HC compromises the identity mapping property when the architecture extends across multiple layers. In architectures comprising multiple parallel streams, an ideal identity mapping serves as a conservation mechanism. It ensures that the average signal intensity across streams remains invariant during both forward and backward propagation. Recursively extending HC to multiple layers via Eq. ([3](https://arxiv.org/html/2512.24880v2#S1.E3 "Equation 3 ‣ 1 Introduction ‣ mHC: Manifold-Constrained Hyper-Connections")) yields:

𝐱 L=(∏i=1 L−l ℋ L−i res)​𝐱 l+∑i=l L−1(∏j=1 L−1−i ℋ L−j res)​ℋ i post⊤​ℱ​(ℋ i pre​𝐱 i,𝒲 i),\mathbf{x}_{L}=\left(\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}}\right)\mathbf{x}_{l}+\sum_{i=l}^{L-1}\left(\prod_{j=1}^{L-1-i}\mathcal{H}_{L-j}^{\mathrm{res}}\right)\mathcal{H}_{i}^{\mathrm{post}\,\top}\mathcal{F}(\mathcal{H}_{i}^{\mathrm{pre}}\mathbf{x}_{i},\mathcal{W}_{i}),(4)

where L L and l l represent a deeper layer and a shallower layer, respectively. In contrast to Eq. ([2](https://arxiv.org/html/2512.24880v2#S1.E2 "Equation 2 ‣ 1 Introduction ‣ mHC: Manifold-Constrained Hyper-Connections")), the composite mapping ∏i=1 L−l ℋ L−i res\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}} in HC fails to preserve the global mean of the features. This discrepancy leads to unbounded signal amplification or attenuation, resulting in instability during large-scale training. A further consideration is that, while HC preserves computational efficiency in terms of FLOPs, the hardware efficiency concerning memory access costs for the widened residual stream remains unaddressed in the original design. These factors collectively restrict the practical scalability of HC and hinder its application in large-scale training.

To address these challenges, we propose Manifold-Constrained Hyper-Connections (m HC), as shown in Fig. [1](https://arxiv.org/html/2512.24880v2#S0.F1 "Figure 1 ‣ mHC: Manifold-Constrained Hyper-Connections")(c), a general framework that projects the residual connection space of HC onto a specific manifold to restore the identity mapping property, while incorporating rigorous infrastructure optimization to ensure efficiency. Specifically, m HC utilizes the Sinkhorn-Knopp algorithm (sinkhorn1967concerning) to entropically project ℋ l res\mathcal{H}_{l}^{\mathrm{res}} onto the Birkhoff polytope. This operation effectively constrains the residual connection matrices within the manifold that is constituted by doubly stochastic matrices. Since the row and column sums of these matrices equal to 1 1, the operation ℋ l res​𝐱 l\mathcal{H}_{l}^{\mathrm{res}}\mathbf{x}_{l} functions as a convex combination of the input features. This characteristic facilitates a well-conditioned signal propagation where the feature mean is conserved, and the signal norm is strictly regularized, effectively mitigating the risk of vanishing or exploding signals. Furthermore, due to the closure of matrix multiplication for doubly stochastic matrices, the composite mapping ∏i=1 L−l ℋ L−i res\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}} retains this conservation property. Consequently, m HC effectively maintains the stability of identity mappings between arbitrary depths. To ensure efficiency, we employ kernel fusion and develop mixed precision kernels utilizing TileLang (wang2025tilelang). Furthermore, we mitigate the memory footprint through selective recomputing and carefully overlap communication within the DualPipe schedule (liu2024deepseek_v3).

Extensive experiments on language model pretraining demonstrate that m HC exhibits exceptional stability and scalability while maintaining the performance advantages of HC. In-house large-scale training indicates that m HC supports training at scale and introduces only a 6.7% additional time overhead when expansion rate n=4 n=4.

2 Related Works
---------------

Architectural advancements in deep learning can be primarily classified into micro-design and macro-design. Micro-design concerns the internal architecture of computational blocks, specifying how features are processed across spatial, temporal, and channel dimensions. In contrast, macro-design establishes the inter-block topological structure, thereby dictating how feature representations are propagated, routed, and merged across distinct layers.

### 2.1 Micro Design

Driven by parameter sharing and translation invariance, convolution initially dominated the processing of structured signals. While subsequent variations such as depthwise separable (chollet2017xception) and grouped convolutions (xie2017aggregated) optimized efficiency, the advent of Transformers (vaswani2017attention) established Attention and Feed-Forward Networks (FFNs) as the fundamental building blocks of modern architecture. Attention mechanisms facilitate global information propagation, while FFNs enhance the representational capacity of individual features. To balance performance with the computational demands of LLMs, attention mechanisms have evolved towards efficient variants such as Multi-Query Attention (MQA) (shazeer2019fast), Grouped-Query Attention (GQA) (ainslie2023gqa), and Multi-Head Latent Attention (MLA) (liu2024deepseek). Simultaneously, FFNs have been generalized into sparse computing paradigms via Mixture-of-Experts (MoE) (shazeer2017outrageously; lepikhin2020gshard; fedus2022switch), allowing for massive parameter scaling without proportional computational costs.

### 2.2 Macro Design

Macro-design governs the global topology of the network (Srivastava2015highway). Following ResNet (he2016deep), architectures such as DenseNet (huang2017densely) and FractalNet (larsson2016fractalnet) aimed to enhance performance by increasing topological complexity through dense connectivity and multi-path structures, respectively. Deep Layer Aggregation (DLA) (yu2018deep) further extended this paradigm by recursively aggregating features across various depths and resolutions.

More recently, the focus of macro-design has shifted toward expanding the width of the residual stream (chai-etal-2020-highway; fang2023crosslayer; xie2023residualtransformerdualresidual; pagliardini2024denseformer; menghani2025laurel; heddes2025deepcrossattention; zhu2024hyper; mak2025residual; xiao2025muddformer). Hyper-Connections (HC) (zhu2024hyper) introduced learnable matrices to modulate connection strengths among features at varying depths, while the Residual Matrix Transformer (RMT) (mak2025residual) replaced the standard residual stream with an outer-product memory matrix to facilitate feature storage. Similarly, MUDDFormer (xiao2025muddformer) employs multiway dynamic dense connections to optimize cross-layer information flow. Despite their potential, these approaches compromise the inherent identity mapping property of the residual connection, thereby introducing instability and hindering scalability. Furthermore, they incur significant memory access overhead due to expanded feature widths. Building upon HC, the proposed m HC restricts the residual connection space onto a specific manifold to restore the identity mapping property, while also incorporating rigorous infrastructure optimizations to ensure efficiency. This approach enhances stability and scalability while maintaining the topological benefits of expanded connections.

3 Preliminary
-------------

We first establish the notation used in this work. In the HC formulation, the input to the l l-th layer, x l∈ℝ 1×C\textbf{x}_{l}\in\mathbb{R}^{1\times C}, is expanded by a factor of n n to construct a hidden matrix x l=(x l,0⊤,…,x l,n−1⊤)⊤∈ℝ n×C\textbf{x}_{l}=(\textbf{x}^{\top}_{l,0},\ldots,\textbf{x}^{\top}_{l,n-1})^{\top}\in\mathbb{R}^{n\times C} which can be viewed as n n-stream residual. This operation effectively broadens the width of the residual stream. To govern the read-out, write-in, and updating processes of this stream, HC introduces three learnable linear mappings—ℋ l pre,ℋ l post∈ℝ 1×n\mathcal{H}^{\mathrm{pre}}_{l},\mathcal{H}^{\mathrm{post}}_{l}\in\mathbb{R}^{1\times n}, and ℋ l res∈ℝ n×n\mathcal{H}^{\mathrm{res}}_{l}\in\mathbb{R}^{n\times n}. These mappings modify the standard residual connection shown in Eq. ([1](https://arxiv.org/html/2512.24880v2#S1.E1 "Equation 1 ‣ 1 Introduction ‣ mHC: Manifold-Constrained Hyper-Connections")), resulting in the formulation given in Eq. ([3](https://arxiv.org/html/2512.24880v2#S1.E3 "Equation 3 ‣ 1 Introduction ‣ mHC: Manifold-Constrained Hyper-Connections")).

In the HC formulation, learnable mappings are composed of two parts of coefficients: the input-dependent one and the global one, referred to as dynamic mappings and static mappings, respectively. Formally, HC computes the coefficients as follows:

{𝐱~l=RMSNorm​(𝐱 l)ℋ l pre=α l pre⋅tanh⁡(θ l pre​𝐱~l⊤)+𝐛 l pre ℋ l post=α l post⋅tanh⁡(θ l post​𝐱~l⊤)+𝐛 l post ℋ l res=α l res⋅tanh⁡(θ l res​𝐱~l⊤)+𝐛 l res,\begin{cases}\tilde{\mathbf{x}}_{l}=\text{RMSNorm}(\mathbf{x}_{l})\\ \mathcal{H}^{\mathrm{pre}}_{l}=\alpha_{l}^{\mathrm{pre}}\cdot\tanh(\theta^{\mathrm{pre}}_{l}\tilde{\mathbf{x}}^{\top}_{l})+\mathbf{b}_{l}^{\mathrm{pre}}\\ \mathcal{H}^{\mathrm{post}}_{l}=\alpha_{l}^{\mathrm{post}}\cdot\tanh(\theta^{\mathrm{post}}_{l}\tilde{\mathbf{x}}^{\top}_{l})+\mathbf{b}_{l}^{\mathrm{post}}\\ \mathcal{H}^{\mathrm{res}}_{l}=\alpha_{l}^{\mathrm{res}}\cdot\tanh(\theta^{\mathrm{res}}_{l}\tilde{\mathbf{x}}^{\top}_{l})+\mathbf{b}_{l}^{\mathrm{res}},\\ \end{cases}(5)

where RMSNorm​(⋅)\text{RMSNorm}(\cdot)(zhang2019root) is applied to the last dimension, and the scalars α l pre,α l post\alpha_{l}^{\mathrm{pre}},\alpha_{l}^{\mathrm{post}} and α l res∈ℝ\alpha_{l}^{\mathrm{res}}\in\mathbb{R} are learnable gating factors initialized to small values. The dynamic mappings are derived via linear projections parameterized by θ l pre,θ l post∈ℝ 1×C\theta^{\mathrm{pre}}_{l},\theta^{\mathrm{post}}_{l}\in\mathbb{R}^{1\times C} and θ l res∈ℝ n×C\theta^{\mathrm{res}}_{l}\in\mathbb{R}^{n\times C}, while the static mappings are represented by learnable biases 𝐛 l pre,𝐛 l post∈ℝ 1×n\mathbf{b}_{l}^{\mathrm{pre}},\mathbf{b}_{l}^{\mathrm{post}}\in\mathbb{R}^{1\times n} and 𝐛 l res∈ℝ n×n\mathbf{b}_{l}^{\mathrm{res}}\in\mathbb{R}^{n\times n}.

It is worth noting that the introduction of these mappings—ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}, ℋ l post\mathcal{H}^{\mathrm{post}}_{l}, and ℋ l res\mathcal{H}^{\mathrm{res}}_{l}—incurs negligible computational overhead, as the typical expansion rate n n, e.g. 4, is much smaller than the input dimension C C. With this design, HC effectively decouples the information capacity of the residual stream from the layer’s input dimension, which is strongly correlated with the model’s computational complexity (FLOPs). Consequently, HC offers a new avenue for scaling by adjusting the residual stream width, complementing the traditional scaling dimensions of model FLOPs and training data size discussed in pre-training scaling laws (Hoffmann2022Chinchilla).

Although HC necessitates three mappings to manage the dimensional mismatch between the residual stream and the layer input, preliminary experiments presented in Tab. [1](https://arxiv.org/html/2512.24880v2#S3.T1 "Table 1 ‣ 3 Preliminary ‣ mHC: Manifold-Constrained Hyper-Connections") indicate that the residual mapping ℋ l res\mathcal{H}^{\mathrm{res}}_{l} yields the most significant performance gain. This finding underscores the critical importance of effective information exchange within the residual stream.

Table 1: Ablation Study of HC Components. When a specific mapping (ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}, ℋ l post\mathcal{H}^{\mathrm{post}}_{l}, or ℋ l res\mathcal{H}^{\mathrm{res}}_{l}) is disabled, we employ a fixed mapping to maintain dimensional consistency: uniform weights of 1/n 1/n for ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}, uniform weights of ones for ℋ l post\mathcal{H}^{\mathrm{post}}_{l}, and the identity matrix for ℋ l res\mathcal{H}^{\mathrm{res}}_{l}.

ℋ l res\mathcal{H}^{\mathrm{res}}_{l}ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}ℋ l post\mathcal{H}^{\mathrm{post}}_{l}Absolute Loss Gap
0.0\phantom{-\ }0.0\phantom{00}
✓− 0.022-\ 0.022
✓✓− 0.025-\ 0.025
✓✓✓− 0.027-\ 0.027

### 3.1 Numerical Instability

While the residual mapping ℋ l res\mathcal{H}^{\mathrm{res}}_{l} is instrumental for performance, its sequential application poses a significant risk to numerical stability. As detailed in Eq. ([4](https://arxiv.org/html/2512.24880v2#S1.E4 "Equation 4 ‣ 1 Introduction ‣ mHC: Manifold-Constrained Hyper-Connections")), when HC is extended across multiple layers, the effective signal propagation from layer l l to L L is governed by the composite mapping ∏i=1 L−l ℋ L−i res\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}}. Since the learnable mapping ℋ l res\mathcal{H}^{\mathrm{res}}_{l} is unconstrained, this composite mapping inevitably deviates from the identity mapping. Consequently, the signal magnitude is prone to explosion or vanishing during both the forward pass and backpropagation. This phenomenon undermines the fundamental premise of residual learning, which relies on unimpeded signal flow, thereby destabilizing the training process in deeper or larger-scale models.

Empirical evidence supports this analysis. We observe unstable loss behavior in large-scale experiments, as illustrated in Fig. [2](https://arxiv.org/html/2512.24880v2#S3.F2 "Figure 2 ‣ 3.1 Numerical Instability ‣ 3 Preliminary ‣ mHC: Manifold-Constrained Hyper-Connections"). Taking m HC as the baseline, HC exhibits an unexpected loss surge around the 12k step, which is highly correlated with the instability in the gradient norm. Furthermore, the analysis on ℋ l res\mathcal{H}^{\mathrm{res}}_{l} validates the mechanism of this instability. To quantify how the composite mapping ∏i=1 L−l ℋ L−i res\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}} amplifies signals along the residual stream, we utilize two metrics. The first, based on the maximum absolute value of the row sums of the composite mapping, captures the worst-case expansion in the forward pass. The second, based on the maximum absolute column sum, corresponds to the backward pass. We refer to these metrics as the Amax Gain Magnitude of the composite mapping. As shown in Fig. [3](https://arxiv.org/html/2512.24880v2#S3.F3 "Figure 3 ‣ 3.1 Numerical Instability ‣ 3 Preliminary ‣ mHC: Manifold-Constrained Hyper-Connections") (b), the Amax Gain Magnitude yields extreme values with peaks of 3000, a stark divergence from 1 that confirms the presence of exploding residual streams.

![Image 2: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x2.png)

Figure 2: Training Instability of Hyper-Connections (HC). This figure illustrates (a) the absolute loss gap of HC relative to m HC, and (b) the comparisons of gradient norms. All results are based on 27B models.

![Image 3: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x3.png)

Figure 3: Propagation Instability of Hyper-Connections (HC). This figure illustrates the propagation dynamics of (a) the single-layer mapping ℋ l res\mathcal{H}^{\mathrm{res}}_{l} and (b) the composite mapping ∏i=1 L−l ℋ L−i res\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}} within the 27B model. The layer index l l (x-axis) unrolls each standard Transformer block into two independent layers (Attention and FFN). The Amax Gain Magnitude (y-axis) is calculated as the maximum absolute row sum (for the forward signal) and column sum (for the backward gradient), averaged over all tokens in a selected sequence.

### 3.2 System Overhead

While the computational complexity of HC remains manageable due to the linearity of the additional mappings, the system-level overhead prevents a non-negligible challenge. Specifically, memory access (I/O) costs often constitute one of the primary bottlenecks in modern model architectures, which is widely referred to as the “memory wall” (dao2022flashattention). This bottleneck is frequently overlooked in architectural design, yet it decisively impacts runtime efficiency.

Table 2: Comparison of Memory Access Costs Per Token. This analysis accounts for the overhead introduced by the residual stream maintenance in the forward pass, excluding the internal I/O of the layer function ℱ\mathcal{F}.

Method Operation Read (Elements)Write (Elements)
Residual Connection Residual Merge 2​C 2C C C
Total I/O 𝟐​𝐂\mathbf{2C}𝐂\mathbf{C}
Hyper-Connections Calculate ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}, ℋ l post\mathcal{H}^{\mathrm{post}}_{l}, ℋ l res\mathcal{H}^{\mathrm{res}}_{l}n​C nC n 2+2​n n^{2}+2n
ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}n​C+n nC+n C C
ℋ l post\mathcal{H}^{\mathrm{post}}_{l}C+n C+n n​C nC
ℋ l res\mathcal{H}^{\mathrm{res}}_{l}n​C+n 2 nC+n^{2}n​C nC
Residual Merge 2​n​C 2nC n​C nC
Total I/O(𝟓​𝐧+𝟏)​𝐂+𝐧 𝟐+𝟐​𝐧\mathbf{(5n+1)C+n^{2}+2n}(𝟑​𝐧+𝟏)​𝐂+𝐧 𝟐+𝟐​𝐧\mathbf{(3n+1)C+n^{2}+2n}

Focusing on the widely adopted pre-norm Transformer (vaswani2017attention) architecture, we analyze the I/O patterns inherent to HC. Tab. [2](https://arxiv.org/html/2512.24880v2#S3.T2 "Table 2 ‣ 3.2 System Overhead ‣ 3 Preliminary ‣ mHC: Manifold-Constrained Hyper-Connections") summarizes the per token memory access overhead in a single residual layer introduced by the n n-stream residual design. The analysis reveals that HC increases the memory access cost by a factor approximately proportional to n n. This excessive I/O demand significantly degrades training throughput without the mitigation of fused kernels. Besides, since ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}, ℋ l post\mathcal{H}^{\mathrm{post}}_{l}, and ℋ l res\mathcal{H}^{\mathrm{res}}_{l} involve learnable parameters, their intermediate activations are required for backpropagation. This results in a substantial increase in the GPU memory footprint, often necessitating gradient checkpointing to maintain feasible memory usage. Furthermore, HC requires n n-fold more communication cost in pipeline parallelism (qi2024zero), leading to larger bubbles and decreasing the training throughput.

4 Method
--------

### 4.1 Manifold-Constrained Hyper-Connections

Drawing inspiration from the identity mapping principle (he2016identity), the core premise of m HC is to constrain the residual mapping ℋ l res\mathcal{H}^{\mathrm{res}}_{l} onto a specific manifold. While the original identity mapping ensures stability by enforcing ℋ l res=𝐈\mathcal{H}^{\mathrm{res}}_{l}=\mathbf{I}, it fundamentally precludes information exchange within the residual stream, which is critical for maximizing the potential of multi-stream architectures. Therefore, we propose projecting the residual mapping onto a manifold that simultaneously maintains the stability of signal propagation across layers and facilitates mutual interaction among residual streams to preserve the model’s expressivity. To this end, we restrict ℋ l res\mathcal{H}^{\mathrm{res}}_{l} to be a doubly stochastic matrix, which has non-negative entries where both the rows and columns sum to 1. Formally, let ℳ res\mathcal{M}^{\mathrm{res}} denote the manifold of doubly stochastic matrices (also known as the Birkhoff polytope). We constrain ℋ l res\mathcal{H}^{\mathrm{res}}_{l} to 𝒫 ℳ res​(ℋ l res)\mathcal{P}_{\mathcal{M}^{\mathrm{res}}}(\mathcal{H}^{\mathrm{res}}_{l}), defined as:

𝒫 ℳ res​(ℋ l res):-{ℋ l res∈ℝ n×n∣ℋ l res​𝟏 n=𝟏 n, 1 n⊤​ℋ l res=𝟏 n⊤,ℋ l res⩾0},\mathcal{P}_{\mathcal{M}^{\mathrm{res}}}(\mathcal{H}^{\mathrm{res}}_{l})\coloneq\left\{\mathcal{H}^{\mathrm{res}}_{l}\in\mathbb{R}^{n\times n}\mid\mathcal{H}^{\mathrm{res}}_{l}\mathbf{1}_{n}=\mathbf{1}_{n},\ \mathbf{1}^{\top}_{n}\mathcal{H}^{\mathrm{res}}_{l}=\mathbf{1}^{\top}_{n},\ \mathcal{H}^{\mathrm{res}}_{l}\geqslant 0\right\},(6)

where 𝟏 n\mathbf{1}_{n} represents the n n-dimensional vector of all ones.

It is worth noting that when n=1 n=1, the doubly stochastic condition degenerates to the scalar 1 1, thereby recovering the original identity mapping. The choice of double stochasticity confers several rigorous theoretical properties beneficial for large-scale model training:

1.   1.
Norm Preservation: The spectral norm of a doubly stochastic matrix is bounded by 1 (i.e., ‖ℋ l res‖2≤1\|\mathcal{H}^{\mathrm{res}}_{l}\|_{2}\leq 1). This implies that the learnable mapping is non-expansive, effectively mitigating the gradient explosion problem.

2.   2.
Compositional Closure: The set of doubly stochastic matrices is closed under matrix multiplication. This ensures that the composite residual mapping across multiple layers, ∏i=1 L−l ℋ L−i res\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}}, remains doubly stochastic, thereby preserving stability throughout the entire depth of the model.

3.   3.
Geometric Interpretation via the Birkhoff Polytope: The set ℳ res\mathcal{M}^{\mathrm{res}} forms the Birkhoff polytope, which is the convex hull of the set of permutation matrices. This provides a clear geometric interpretation: the residual mapping acts as a convex combination of permutations. Mathematically, the repeated application of such matrices tends to increase the mixing of information across streams monotonically, effectively functioning as a robust feature fusion mechanism.

Additionally, we impose non-negativity constraints on the input mappings ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l} and output mappings ℋ l post\mathcal{H}^{\mathrm{post}}_{l}. This constrain prevents signal cancellation arising from the composition of positive and negative coefficients, which can also be considered as a special manifold projection.

### 4.2 Parameterization and Manifold Projection

In this section, we detail the calculation process of ℋ l pre,ℋ l post,and​ℋ l res\mathcal{H}^{\mathrm{pre}}_{l},\mathcal{H}^{\mathrm{post}}_{l},\text{and }\mathcal{H}^{\mathrm{res}}_{l} in m HC. Given the input hidden matrix 𝐱 l∈ℝ n×C\mathbf{x}_{l}\in\mathbb{R}^{n\times C} at the l l-th layer, we first flatten it into a vector 𝐱→l=vec​(𝐱 l)∈ℝ 1×n​C\vec{\mathbf{x}}_{l}=\text{vec}(\mathbf{x}_{l})\in\mathbb{R}^{1\times nC} to preserve full context information. Then, we follow the original HC formulation to get the dynamic mappings and the static mappings as follows:

{𝐱→l′=RMSNorm​(𝐱→l)ℋ~l pre=α l pre⋅(𝐱→l′​φ l pre)+𝐛 l pre ℋ~l post=α l post⋅(𝐱→l′​φ l post)+𝐛 l post ℋ~l res=α l res⋅mat​(𝐱→l′​φ l res)+𝐛 l res,\begin{cases}\vec{\mathbf{x}}^{\prime}_{l}=\text{RMSNorm}(\vec{\mathbf{x}}_{l})\\ \tilde{\mathcal{H}}^{\mathrm{pre}}_{l}=\alpha_{l}^{\mathrm{pre}}\cdot(\vec{\mathbf{x}}^{\prime}_{l}\varphi^{\mathrm{pre}}_{l})+\mathbf{b}_{l}^{\mathrm{pre}}\\ \tilde{\mathcal{H}}^{\mathrm{post}}_{l}=\alpha_{l}^{\mathrm{post}}\cdot(\vec{\mathbf{x}}^{\prime}_{l}\varphi^{\mathrm{post}}_{l})+\mathbf{b}_{l}^{\mathrm{post}}\\ \tilde{\mathcal{H}}^{\mathrm{res}}_{l}=\alpha_{l}^{\mathrm{res}}\cdot\text{mat}(\vec{\mathbf{x}}^{\prime}_{l}\varphi^{\mathrm{res}}_{l})+\mathbf{b}_{l}^{\mathrm{res}},\\ \end{cases}(7)

where φ l pre,φ l post∈ℝ n​C×n\varphi^{\mathrm{pre}}_{l},\varphi^{\mathrm{post}}_{l}\in\mathbb{R}^{nC\times n} and φ l res∈ℝ n​C×n 2\varphi^{\mathrm{res}}_{l}\in\mathbb{R}^{nC\times n^{2}} are linear projections for dynamic mappings and mat​(⋅)\text{mat}(\cdot) is a reshape function from ℝ 1×n 2\mathbb{R}^{1\times n^{2}} to ℝ n×n\mathbb{R}^{n\times n}.

Then, the final constrained mappings are obtained via:

{ℋ l pre=σ​(ℋ~l pre)ℋ l post=2​σ​(ℋ~l post)ℋ l res=Sinkhorn-Knopp​(ℋ~l res),\begin{cases}\mathcal{H}^{\mathrm{pre}}_{l}=\sigma(\tilde{\mathcal{H}}^{\mathrm{pre}}_{l})\\ \mathcal{H}^{\mathrm{post}}_{l}=2\sigma(\tilde{\mathcal{H}}^{\mathrm{post}}_{l})\\ \mathcal{H}^{\mathrm{res}}_{l}=\text{Sinkhorn-Knopp}(\tilde{\mathcal{H}}^{\mathrm{res}}_{l}),\end{cases}(8)

where σ​(⋅)\sigma(\cdot) denotes the Sigmoid function. The Sinkhorn-Knopp​(⋅)\text{Sinkhorn-Knopp}(\cdot) operator firstly makes all elements to be positive via an exponent operator and then conducts iterative normalization process that alternately rescales rows and columns to sum to 1. Specifically, given a positive matrix 𝐌(0)=exp⁡(ℋ~l res)\mathbf{M}^{(0)}=\exp(\tilde{\mathcal{H}}^{\mathrm{res}}_{l}) as the start point, the normalization iteration proceeds as:

𝐌(t)=𝒯 r​(𝒯 c​(𝐌(t−1))),\mathbf{M}^{(t)}=\mathcal{T}_{r}\left(\mathcal{T}_{c}(\mathbf{M}^{(t-1)})\right),(9)

where 𝒯 r\mathcal{T}_{r} and 𝒯 c\mathcal{T}_{c} denote row and column normalization, respectively. This process converges to a doubly stochastic matrix ℋ l res=𝐌(t max)\mathcal{H}^{\mathrm{res}}_{l}=\mathbf{M}^{(t_{\text{max}})} as t max→∞t_{\text{max}}\to\infty. We choose t max=20 t_{\text{max}}=20 as a practical value in our experiments.

### 4.3 Efficient Infrastructure Design

In this section, we detail the infrastructure design tailored for m HC. Through rigorous optimization, we implement m HC (with n=4 n=4) in large-scale models with a marginal training overhead of only 6.7%.

#### 4.3.1 Kernel Fusion

Observing that RMSNorm in m HC imposes significant latency when operating on the high-dimensional hidden state 𝐱→l∈ℝ 1×n​C\vec{\mathbf{x}}_{l}\in\mathbb{R}^{1\times nC}, we reorder the dividing-by-norm operation to follow the matrix multiplication. This optimization maintains mathematical equivalence while improving efficiency. Furthermore, we employ mixed-precision strategies to maximize numerical accuracy without compromising speed, and fuse multiple operations with shared memory access into unified compute kernels to reduce memory bandwidth bottlenecks. Based on the inputs and parameters detailed in Eq. ([10](https://arxiv.org/html/2512.24880v2#S4.E10 "Equation 10 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")) to ([13](https://arxiv.org/html/2512.24880v2#S4.E13 "Equation 13 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")), we implement three specialized m HC kernels to compute ℋ l pre\mathcal{H}^{\mathrm{pre}}_{l}, ℋ l post\mathcal{H}^{\mathrm{post}}_{l}, and ℋ l res\mathcal{H}^{\mathrm{res}}_{l}. In these kernels, the biases and linear projections are consolidated into 𝐛 l\mathbf{b}_{l} and φ l\varphi_{l}, and the RMSNorm weight is also absorbed in φ l\varphi_{l}.

*   •
Eq. ([14](https://arxiv.org/html/2512.24880v2#S4.E14 "Equation 14 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")) to ([15](https://arxiv.org/html/2512.24880v2#S4.E15 "Equation 15 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")): We develop a unified kernel that fuses two scans on 𝐱→l\vec{\mathbf{x}}_{l}, leveraging matrix multiplication units to maximize memory bandwidth utilization. The backward pass—comprising two matrix multiplications—is similarly consolidated into a single kernel, eliminating redundant reloading of 𝐱→l\vec{\mathbf{x}}_{l}. Both kernels feature a finely tuned pipeline (load, cast, compute, store) to efficiently handle mixed-precision processing.

*   •
Eq. ([16](https://arxiv.org/html/2512.24880v2#S4.E16 "Equation 16 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")) to ([18](https://arxiv.org/html/2512.24880v2#S4.E18 "Equation 18 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")): These lightweight operations on small coefficients are opportunistically fused into a single kernel, significantly reducing kernel launch overhead.

*   •
Eq. ([19](https://arxiv.org/html/2512.24880v2#S4.E19 "Equation 19 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")): We implement the Sinkhorn-Knopp iteration within a single kernel. For the backward pass, we derive a custom backward kernel that recomputes the intermediate results on-chip and traverses the entire iteration.

φ l\displaystyle\varphi_{l}:tfloat32\displaystyle:\text{tfloat32}[n​C,n 2+2​n]\displaystyle[nC,n^{2}+2n](10)
𝐱→l\displaystyle\vec{\mathbf{x}}_{l}:bfloat16\displaystyle:\text{bfloat16}[1,n​C]\displaystyle[1,nC](11)
α l pre,α l post,α l res\displaystyle\alpha_{l}^{\mathrm{pre}},\alpha_{l}^{\mathrm{post}},\alpha_{l}^{\mathrm{res}}:float32\displaystyle:\text{float32}Scalars(12)
𝐛 l\displaystyle\mathbf{b}_{l}:float32\displaystyle:\text{float32}[1,n 2+2​n]\displaystyle[1,n^{2}+2n](13)
[ℋ~~l pre,ℋ~~l post,ℋ~~l res]\displaystyle\left[{\tilde{\tilde{\mathcal{H}}}^{\mathrm{pre}}_{l}},{\tilde{\tilde{\mathcal{H}}}^{\mathrm{post}}_{l}},{\tilde{\tilde{\mathcal{H}}}^{\mathrm{res}}_{l}}\right]:float32\displaystyle:\text{float32}=𝐱→l​φ l\displaystyle=\vec{\mathbf{x}}_{l}\varphi_{l}(14)
r\displaystyle r:float32\displaystyle:\text{float32}=‖𝐱→l‖2/n​C\displaystyle=\left\|\vec{\mathbf{x}}_{l}\right\|_{2}/\sqrt{nC}(15)
[ℋ~l pre,ℋ~l post,ℋ~l res]\displaystyle\left[\tilde{\mathcal{H}}^{\mathrm{pre}}_{l},\tilde{\mathcal{H}}^{\mathrm{post}}_{l},\tilde{\mathcal{H}}^{\mathrm{res}}_{l}\right]:float32\displaystyle:\text{float32}=1/r​[α l pre​ℋ~~l pre,α l post​ℋ~~l post,α l res​ℋ~~l res]+𝐛 l\displaystyle=1/r\left[\alpha_{l}^{\mathrm{pre}}{\tilde{\tilde{\mathcal{H}}}^{\mathrm{pre}}_{l}},\alpha_{l}^{\mathrm{post}}{\tilde{\tilde{\mathcal{H}}}^{\mathrm{post}}_{l}},\alpha_{l}^{\mathrm{res}}{\tilde{\tilde{\mathcal{H}}}^{\mathrm{res}}_{l}}\right]+\mathbf{b}_{l}(16)
ℋ l pre\displaystyle\mathcal{H}^{\mathrm{pre}}_{l}:float32\displaystyle:\text{float32}=σ​(ℋ~l pre)\displaystyle=\sigma\left(\tilde{\mathcal{H}}^{\mathrm{pre}}_{l}\right)(17)
ℋ l post\displaystyle\mathcal{H}^{\mathrm{post}}_{l}:float32\displaystyle:\text{float32}=2​σ​(ℋ~l post)\displaystyle=2\sigma\left(\tilde{\mathcal{H}}^{\mathrm{post}}_{l}\right)(18)
ℋ l res\displaystyle\mathcal{H}^{\mathrm{res}}_{l}:float32\displaystyle:\text{float32}=Sinkhorn-Knopp​(ℋ~l res)\displaystyle=\text{Sinkhorn-Knopp}\left(\tilde{\mathcal{H}}^{\mathrm{res}}_{l}\right)(19)

Using the coefficients derived from the aforementioned kernels, we introduce two additional kernels to apply these mappings: one for ℱ pre:-ℋ l pre​𝐱 l\mathcal{F}_{\mathrm{pre}}\coloneq\mathcal{H}^{\mathrm{pre}}_{l}\mathbf{x}_{l} and another for ℱ post,res:-ℋ l res​𝐱 l+ℋ l post⊤​ℱ​(⋅,⋅)\mathcal{F}_{\mathrm{post,res}}\coloneq\mathcal{H}^{\mathrm{res}}_{l}\mathbf{x}_{l}+\mathcal{H}_{l}^{\mathrm{post}\,\top}\mathcal{F}(\cdot,\cdot). Through fusing the application of ℋ l post\mathcal{H}^{\mathrm{post}}_{l} and ℋ l res\mathcal{H}^{\mathrm{res}}_{l} with residual merging, we reduce the number of elements read from (3​n+1)​C(3n+1)C to (n+1)​C(n+1)C and the number of elements written from 3​n​C 3nC to n​C nC for this kernel. We efficiently implement the majority of kernels (excluding Eq. ([14](https://arxiv.org/html/2512.24880v2#S4.E14 "Equation 14 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")) to ([15](https://arxiv.org/html/2512.24880v2#S4.E15 "Equation 15 ‣ 4.3.1 Kernel Fusion ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections"))) using TileLang (wang2025tilelang). This framework streamlines the implementation of kernels with complex calculation process and allows us to fully utilize the memory bandwidth with minimal engineering effort.

#### 4.3.2 Recomputing

The n n-stream residual design introduces substantial memory overhead during training. To mitigate this, we discard the intermediate activations of the m HC kernels after the forward pass and recompute them on-the-fly in the backward pass, through re-executing the m HC kernels without the heavy layer function ℱ\mathcal{F}. Consequently, for a block of L r L_{r} consecutive layers, we need only store the input 𝐱 l 0\mathbf{x}_{l_{0}} to the first layer. Excluding lightweight coefficients while accounting for the pre-norm with in ℱ\mathcal{F}, Tab. [3](https://arxiv.org/html/2512.24880v2#S4.T3 "Table 3 ‣ 4.3.2 Recomputing ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections") summarizes the intermediate activations preserved for the backward pass.

Table 3: Stored and Recomputed Intermediate Activations We list per token activation preserved for the backward pass and the transient activation recomputed in L r L_{r} consecutive layers. Layer l 0 l_{0} represents the first layer in L r L_{r} layers and layer l l is in [l 0,l 0+L r−1][l_{0},l_{0}+L_{r}-1].

Activations 𝐱 l 0\mathbf{x}_{l_{0}}ℱ​(ℋ l pre​𝐱 l,𝒲 l)\mathcal{F}(\mathcal{H}^{\mathrm{pre}}_{l}\mathbf{x}_{l},\mathcal{W}_{l})𝐱 l\mathbf{x}_{l}ℋ l pre​𝐱 l\mathcal{H}^{\mathrm{pre}}_{l}\mathbf{x}_{l}RMSNorm​(ℋ l pre​𝐱 l)\text{RMSNorm}(\mathcal{H}^{\mathrm{pre}}_{l}\mathbf{x}_{l})
Size (Elements)n​C nC C C n​C nC C C C C
Stored Method Every L r L_{r} layers Every layer Transient inside L r L_{r} layers

Since m HC kernels recomputation is performed for blocks of L r L_{r} consecutive layers, given a total of L L layers, we must persistently store the first layer input 𝐱 l 0\mathbf{x}_{l_{0}} for all ⌈L L r⌉\lceil\tfrac{L}{L_{r}}\rceil blocks for the backward pass. In addition to this resident memory, the recomputation process introduces a transient memory overhead of (n+2)​C×L r(n+2)C\times L_{r} elements for the active block, which determines the peak memory usage during backpropagation. Consequently, we determine the optimal block size L r∗L_{r}^{*} by minimizing the total memory footprint corresponded to L r L_{r}:

L r∗=arg⁡min L r⁡[n​C×⌈L L r⌉+(n+2)​C×L r]≈n​L n+2.L_{r}^{*}=\arg\min_{L_{r}}\left[nC\times\left\lceil\frac{L}{L_{r}}\right\rceil+(n+2)C\times L_{r}\right]\approx\sqrt{\frac{nL}{n+2}}.(20)

Furthermore, pipeline parallelism in large-scale training imposes a constraint: recomputation blocks must not cross pipeline stage boundaries. Observing that the theoretical optimum L r∗L_{r}^{*} typically aligns with the number of layers per pipeline stage, we choose to synchronize the recomputation boundaries with the pipeline stages.

#### 4.3.3 Overlapping Communication in DualPipe

In large-scale training, pipeline parallelism is the standard practice for mitigating parameter and gradient memory footprints. Specifically, we adopt the DualPipe schedule (liu2024deepseek_v3), which effectively overlaps scale-out interconnected communication traffic, such as those in expert and pipeline parallelism. However, compared to the single-stream design, the proposed n n-stream residual in m HC incurs substantial communication latency across pipeline stages. Furthermore, at stage boundaries, the recomputation of m HC kernels for all L r L_{r} layers introduces non-negligible computational overhead. To address these bottlenecks, we extend the DualPipe schedule (see Fig. [4](https://arxiv.org/html/2512.24880v2#S4.F4 "Figure 4 ‣ 4.3.3 Overlapping Communication in DualPipe ‣ 4.3 Efficient Infrastructure Design ‣ 4 Method ‣ mHC: Manifold-Constrained Hyper-Connections")) to facilitate improved overlapping of communication and computation at pipeline stage boundaries.

![Image 4: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x4.png)

Figure 4: Communication-Computation Overlapping for m HC. We extend the DualPipe schedule to handle the overhead introduced by m HC. Lengths of each block are illustrative only and do not represent actual duration. (F), (B), (W) refers to forward pass, backward pass, weight gradient computation, respectively. ℱ A​and​ℱ M\mathcal{F}^{\mathrm{A}}\ \text{and}\ \mathcal{F}^{\mathrm{M}} represents kernels corresponded to Attention and MLP, respectively.

Notably, to prevent blocking the communication stream, we execute the ℱ post,res\mathcal{F}_{\mathrm{post,res}} kernels of MLP (i.e. FFN) layers on a dedicated high-priority compute stream. We further refrain from employing persistent kernels for long-running operations in attention layers, thereby preventing extended stalls. This design enables the preemption of overlapped attention computations, allowing for flexible scheduling while maintaining high utilization of the compute device’s processing units. Furthermore, the recomputation process is decoupled from pipeline communication dependencies, as the initial activation of each stage 𝐱 l 0\mathbf{x}_{l_{0}} is already cached locally.

5 Experiments
-------------

### 5.1 Experimental Setup

We validate the proposed method via language model pre-training, conducting a comparative analysis between the baseline, HC, and our proposed m HC. Utilizing MoE architectures inspired by DeepSeek-V3 (liu2024deepseek_v3), we train four distinct model variants to cover different evaluation regimes. Specifically, the expansion rate n n for both HC and m HC is set to 4. Our primary focus is a 27B model trained with a dataset size proportional to its parameters, which serves as the subject for our system-level main results. Expanding on this, we analyze the compute scaling behavior by incorporating smaller 3B and 9B models trained with proportional data, which allows us to observe performance trends across varying compute. Additionally, to specifically investigate the token scaling behavior, we train a separate 3B model on a fixed corpus of 1 trillion tokens. Detailed model configurations and training hyper-parameters are provided in Appendix [A.1](https://arxiv.org/html/2512.24880v2#A1.SS1 "A.1 Detailed Model Specifications and Hyper-parameters. ‣ Appendix A Appendix ‣ mHC: Manifold-Constrained Hyper-Connections").

### 5.2 Main Results

![Image 5: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x5.png)

Figure 5: Training Stability of Manifold-Constrained Hyper-Connections (m HC). This figure illustrates (a) the absolute training loss gap of m HC and HC relative to the baseline, and (b) the gradient norm of the three methods. All experiments utilize the 27B model. The results demonstrate that m HC exhibits improved stability in terms of both loss and gradient norm. 

Table 4: System-level Benchmark Results for 27B Models. This table compares the zero-shot and few-shot performance of the Baseline, HC, and m HC across 8 diverse downstream benchmarks. m HC consistently outperforms the Baseline and surpasses HC on the majority of benchmarks, demonstrating its effectiveness in large-scale pre-training. 

Benchmark BBH DROP GSM8K HellaSwag MATH MMLU PIQA TriviaQA
(Metric)(EM)(F1)(EM)(Acc.)(EM)(Acc.)(Acc.)(EM)
# Shots 3-shot 3-shot 8-shot 10-shot 4-shot 5-shot 0-shot 5-shot
27B Baseline 43.8 47.0 46.7 73.7 22.0 59.0 78.5 54.3
27B w/ HC 48.9 51.6 53.2 74.3 26.4 63.0 79.9 56.3
27B w/ m HC 51.0 53.9 53.8 74.7 26.0 63.4 80.5 57.6

We begin by examining the training stability and convergence of the 27B models. As illustrated in Fig. [5](https://arxiv.org/html/2512.24880v2#S5.F5 "Figure 5 ‣ 5.2 Main Results ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections") (a), m HC effectively mitigates the training instability observed in HC, achieving a final loss reduction of 0.021 compared to the baseline. This improved stability is further corroborated by the gradient norm analysis in Fig. [5](https://arxiv.org/html/2512.24880v2#S5.F5 "Figure 5 ‣ 5.2 Main Results ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections") (b), where m HC exhibits significantly better behavior than HC, maintaining a stable profile comparable to the baseline.

Tab. [4](https://arxiv.org/html/2512.24880v2#S5.T4 "Table 4 ‣ 5.2 Main Results ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections") presents the downstream performance across a diverse set of benchmarks (mmlu; gsm8k; hellaswag; hendrycks2021measuring; piqa; joshi-etal-2017-triviaqa). m HC yields comprehensive improvements, consistently outperforming the baseline and surpassing HC on the majority of tasks. Notably, compared to HC, m HC further enhances the model’s reasoning capabilities, delivering performance gains of 2.1% on BBH (bbh) and 2.3% on DROP (drop).

### 5.3 Scaling Experiments

![Image 6: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x6.png)

Figure 6: Scaling properties of m HC compared to the Baseline.(a) Compute Scaling Curve. Solid lines depict the performance gap across different compute budgets. Each point represents a specific compute-optimal configuration of model size and dataset size, scaling from 3B and 9B to 27B parameters. (b) Token Scaling Curve. Trajectory of the 3B model during training. Each point represents the model’s performance at different training tokens. Detailed architectures and training configurations are provided in Appendix [A.1](https://arxiv.org/html/2512.24880v2#A1.SS1 "A.1 Detailed Model Specifications and Hyper-parameters. ‣ Appendix A Appendix ‣ mHC: Manifold-Constrained Hyper-Connections"). 

To assess the scalability of our approach, we report the relative loss improvement of m HC against the baseline across different scales. In Fig. [6](https://arxiv.org/html/2512.24880v2#S5.F6 "Figure 6 ‣ 5.3 Scaling Experiments ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections") (a), we plot the compute scaling curve spanning 3B, 9B, and 27B parameters. The trajectory indicates that the performance advantage is robustly maintained even at higher computational budgets, showing only marginal attenuation. Furthermore, we examine the within-run dynamics in Fig. [6](https://arxiv.org/html/2512.24880v2#S5.F6 "Figure 6 ‣ 5.3 Scaling Experiments ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections") (b), which presents the token scaling curve for the 3B model. Collectively, these findings validate the effectiveness of m HC in large-scale scenarios. This conclusion is further corroborated by our in-house large-scale training experiments.

### 5.4 Stability Analysis

![Image 7: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x7.png)

Figure 7: Propagation Stability of Manifold-Constrained Hyper-Connections (m HC). This figure illustrates the propagation dynamics of (a) the single-layer mapping 𝒫 ℳ res​(ℋ l res)\mathcal{P}_{\mathcal{M}^{\mathrm{res}}}(\mathcal{H}^{\mathrm{res}}_{l}) and (b) the composite mapping ∏i=1 L−l 𝒫 ℳ res​(ℋ L−i res)\prod_{i=1}^{L-l}\mathcal{P}_{\mathcal{M}^{\mathrm{res}}}(\mathcal{H}_{L-i}^{\mathrm{res}}) within the 27B model. The results demonstrate that m HC significantly enhances propagation stability compared to HC. 

![Image 8: Refer to caption](https://www.arxiv.org/html/2512.24880v2/x8.png)

Figure 8: Visualizations of Learnable Mappings. This figure displays representative single-layer and composite mappings for HC (first row) and m HC (second row). Each matrix is computed by averaging over all tokens within a selected sequence. The labels annotated along the y-axis and x-axis indicate the forward signal gain (row sum) and the backward gradient gain (column sum), respectively. 

Similar to Fig. [3](https://arxiv.org/html/2512.24880v2#S3.F3 "Figure 3 ‣ 3.1 Numerical Instability ‣ 3 Preliminary ‣ mHC: Manifold-Constrained Hyper-Connections"), Fig. [7](https://arxiv.org/html/2512.24880v2#S5.F7 "Figure 7 ‣ 5.4 Stability Analysis ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections") illustrates the propagation stability of m HC. Ideally, the single-layer mapping satisfies the doubly stochastic constraint, implying that both the forward signal gain and the backward gradient gain should equal to 1. However, practice implementations utilizing the Sinkhorn-Knopp algorithm must limit the number of iterations to achieve computational efficiency. In our settings, we use 20 iterations to obtain an approximate solution. Consequently, as shown in Fig. [7](https://arxiv.org/html/2512.24880v2#S5.F7 "Figure 7 ‣ 5.4 Stability Analysis ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections")(a), the backward gradient gain deviates slightly from 1. In the composite case shown in Fig. [7](https://arxiv.org/html/2512.24880v2#S5.F7 "Figure 7 ‣ 5.4 Stability Analysis ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections")(b), the deviation increases but remains bounded, reaching a maximum value of approximately 1.6. Notably, compared to the maximum gain magnitude of nearly 3000 in HC, m HC significantly reduces it by three orders of magnitude. These results demonstrate that m HC significantly enhances propagation stability compared to HC, ensuring stable forward signal and backward gradient flows. Additionally, Fig. [8](https://arxiv.org/html/2512.24880v2#S5.F8 "Figure 8 ‣ 5.4 Stability Analysis ‣ 5 Experiments ‣ mHC: Manifold-Constrained Hyper-Connections") displays representative mappings. We observe that for HC, when the maximum gain is large, other values also tend to be significant, which indicates general instability across all propagation paths. In contrast, m HC consistently yields stable results.

6 Conclusion and Outlook
------------------------

In this paper, we identify that while expanding the width of residual stream and diversifying connections yields performance gains as proposed in Hyper-Connections (HC), the unconstrained nature of these connections leads to signal divergence. This disruption compromises the conservation of signal energy across layers, inducing training instability and hindering the scalability of deep networks. To address these challenges, we introduce Manifold-Constrained Hyper-Connections (m HC), a generalized framework that projects the residual connection space onto a specific manifold. By employing the Sinkhorn-Knopp algorithm to enforce a doubly stochastic constraint on residual mappings, m HC transforms signal propagation into a convex combination of features. Empirical results confirm that m HC effectively restores the identity mapping property, enabling stable large-scale training with superior scalability compared to conventional HC. Crucially, through efficient infrastructure-level optimizations, m HC delivers these improvements with negligible computational overhead.

As a generalized extension of the HC paradigm, m HC opens several promising avenues for future research. Although this work utilizes doubly stochastic matrices to ensure stability, the framework accommodates the exploration of diverse manifold constraints tailored to specific learning objectives. We anticipate that further investigation into distinct geometric constraints could yield novel methods that better optimize the trade-off between plasticity and stability. Furthermore, we hope m HC rejuvenates community interest in macro-architecture design. By deepening the understanding of how topological structures influence optimization and representation learning, m HC will help address current limitations and potentially illuminate new pathways for the evolution of next-generation foundational architectures.

Appendix A Appendix
-------------------

### A.1 Detailed Model Specifications and Hyper-parameters.

Table 5: Detailed Model Specifications and Hyper-parameters. This table presents the architectural configurations for the 3B, 9B, and 27B models based on the DeepSeek-V3 (liu2024deepseek_v3) architecture. It outlines the specific hyper-parameters for m HC and HC, including the residual stream expansion and Sinkhorn-Knopp settings, alongside the optimization and training protocols used in the experiments. 

Attribute 3B 9B 27B 3B
1T Tokens
Vocab Params 331M 496M 662M 331M
Active Params 612M 1.66B 4.14B 612M
Total Params 2.97B 9.18B 27.0B 2.97B
Layers 12 18 30 12
Leading Dense Layers 1 1
Routed Experts 64 64 72 64
Active Experts 6 6
Shared Experts 2 2
Dimension 1280 1920 2560 1280
FFN Dimension 896 1280 1536 896
Load Balancing Method Loss-Free (wang2024auxiliary)Loss-Free
Attention Heads 16 24 32 16
Attention Dimension 128 128
Attention Variant MLA (liu2024deepseek)MLA
KV Rank 512 512
Position Embedding RoPE (su2024roformer)RoPE
RoPE Dimension 64 64
RoPE θ\theta 10000 10000
Layer Norm Type RMSNorm (zhang2019root)RMSNorm
Layer Norm ε\varepsilon 1e-20 1e-20
m HC/HC Expansion Rate n n 4 4
m HC/HC Gating Factor Init α\alpha 0.01 0.01
m HC Sinkhorn-Knopp t max t_{\text{max}}20 20
Sequence Length 4096 4096
Vocab Size 129280 129280
Batch Size 320 512 1280 2560
Training Steps 30000 50000 50000 100000
Training Tokens 39.3B 105B 262B 1.05T
Warmup Steps 2000 2000
Optimizer AdamW (loshchilov2017decoupled)AdamW
AdamW Betas(0.9, 0.95)(0.9, 0.95)
AdamW ε\varepsilon 1e-20 1e-20
Base Learning Rate 8.6e-4 5.9e-4 4.0e-4 9.0e-4
Lr Scheduler Step Step
Lr Decay Step Ratio[0.8 ×\times, 0.9 ×\times][0.8 ×\times, 0.9 ×\times]
Lr Decay Rate[0.316, 0.1][0.316, 0.1]
Weight Decay 0.1 0.1
