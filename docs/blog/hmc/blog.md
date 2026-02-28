
In recent work by DeepSeek they introduce manifold constraint hyper connections.
This builds upon earlier work where hyper connections are introduced, which widen
the residual stream in deep neural networks by a factor $n$ (typically small eg 4).
Instead of identity mapping, the residual stream is mapped using a project 
$\mathcal{H}^\textrm{res}$ in every block.

This has a positive effect on performance with a small FLOP cost, but leads to 
training instability. In the DeepSeek paper this training insability is fixed
by restricting the projection H on the manifold of doubly stochastic matrices
also known as the Birkhoff polytope, which has a few desirable properties
which ensures that the composition over layers 
$\prod_l \mathcal{H}^\textrm{res}_l$ is nicely behaved.

This restriction is achieved by projecting an arbitrary matrix using the 
Sinkhorn-Knopp process an iterative process which maps an arbitrary matrix
to a doubly stochastic one.

In this note I suggest an alternative method

## Paper

To analyse the product $\prod_l A_l$ there is the important concept of 

A doubly stochastic matrix $A$ satifies the following properties \[
    A1 = 1, \qquad A^T 1 = 1, \qquad A \geq 0
\]

Why are these important? The first two essentially state that 1 is an eigenvector for both $A$ and $A^T$ (with eigen value 1). This is important because it means that at least the all ones vector gets passed unchanged through the network forwardly: \[
    (\prod_l \mathcal{H}^\textrm{res}_l) 1 = 1
\]

Moreover, differentiating $y = \mathcal{H}^\textrm{res} x$ we get \[
    \mathrm{d} x = A^T \cdot \mathrm{d} y
\]

Thus for the backwards pass we get the same behavior with the same.

## Alternative


