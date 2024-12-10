# **Flow Matching**

<span class="subtitle">

This is NOT original work, but a summary of Flow Matching Guide and Code[^1].

</span>

---

## Introduction

Given a dataset of samples drawn from distribution $q$ over $\mathbb{R}^d$, our goal is to build a model capable of generating new samples from $q$ given some initial source distribution $p$. **Flow Matching (FM)** builds a **probability path** $(p_t)_{0 \leq t \leq 1}$ from a known source distribution $p_0 = p$ to the target distribution $p_1 = q$, where each $p_t$ is a distribution over $\mathbb{R}^d$. After training, we generate a novel sample from the target distribution $X_1 \sim q$ by (i) drawing a novel sample from the source distribution $X_0 \sim p$, and (ii) solving the ODE determined by the **velocity field**, defined as

$$
\begin{equation} \label{eq:velocity-field}
\frac{d}{dt}\psi_t(x) = u_t\left(\psi_t(x) \right),
\end{equation}
$$

where $u: [0, 1] \times \mathbb{R}^d \to \mathbb{R}^d$ is the _time-dependent velocity field_ and $\psi_t: [0, 1] \times \mathbb{R}^d \to \mathbb{R}^d$ is the time-dependent **flow**, where $\psi_t \colonequals \psi(t, x)$. The velocity field $u_t$ generates the probability path $p_t$ if its flow $\psi_t$ satisfies:

$$
\begin{equation} \label{eq:flow}
X_t \colonequals \psi_t(X_0) \sim p_t \text{ for } X_0 \sim p_0.
\end{equation}
$$

This means that solving the ODE until $t = 1$ provides us with samples $X_1 = \psi_1(X_0)$, resembling the target distribution $q$. Therefore, the goal of FM is to learn a vector velocity field $u_t^\theta$ such that its flow $\psi_t$ generates a probability path $p_t$ with $p_0 = p$ and $p_1 = q$.

![The Flow Matching blueprint](https://branyang02.github.io/images/flow-matching-blueprint.png)

FM thus requires two steps:

1. Design a probability path $p_t$ from $p$ to $q$.
2. Train a velocity field $u_t^\theta$ to generate the probability path $p_t$.

### Path Design

We first design a probability path $(p_t)_{0 \leq t \leq 1}$ from $p_0 = p$ to $p_1 = q$ by defining a sequence of intermediate distributions. In this example, let the source distribution $p \colonequals p_0  = \mathcal{N}(x|0, I)$, and construct the probability path $p_t$ as the aggregation of the conditional probability paths $p_{t | 1}(x | x_1)$, each conditioned on one of the data examples $X_1 = x_1$ comprising the training dataset. The probability path $p_t$ therefore follows the expression:

$$
\begin{equation} \label{eq:probability-path}
p_t(x)=\int p_{t \mid 1}\left(x \mid x_1\right) q\left(x_1\right) \mathrm{d} x_1, \text { where } p_{t \mid 1}\left(x \mid x_1\right)=\mathcal{N}\left(x \mid t x_1,(1-t)^2 I\right).
\end{equation}
$$

$p_{t | 1}(x | x_1)$ is a Gaussian distribution whose mean moves linearly from the origin $0$ at $t = 0$ to the data point $x_1$ at $t = 1$:

- When $t = 0$, the mean is $0$, and the variance is $I$, so $p_{0 | 1}(x | x_1) = \mathcal{N}(x | 0, I)$, which is the source distribution $p$.
- As $t \to 1$, the mean approaches $x_1$, and the variance $(1-t)^2 \to 0$, so we eventually recover the target distribution $q$.

Using this probability path, we may define the random variable $X_t \sim p_t$ by drawing $X_0 \sim p$, $X_1 \sim q$, and taking their linear combination:

$$
\begin{equation} \label{eq:linear-combination-random-variable}
X_t = tX_1 + (1-t)X_0 \sim p_t.
\end{equation}
$$

### FM training

We can now continue with the second step in the FM recipe: regression our velocity field $u_t^\theta$ to a target velocity field $u_t$ known to generate the desired probability path $p_t$. We define the **Flow Matching loss**:

$$
\begin{equation} \label{eq:flow-matching-loss}
\mathcal{L}_{\mathrm{FM}}(\theta)=\mathbb{E}_{t, X_t}\left\|u_t^\theta\left(X_t\right)-u_t\left(X_t\right)\right\|^2 \text {, where } t \sim \mathcal{U}[0,1] \text { and } X_t \sim p_t \text {. }
\end{equation}
$$

In practice, one can rarely implement the objective above, because $u_t$ is a complicated object governing the _join_ transformation between two high-dimensional distributions. Fortunately, the objective simplifies by conditioning the loss on a single target example $X_1 = x_1$ picked at _random_ from the training dataset. We borrow $\eqref{eq:linear-combination-random-variable}$ to realize the conditional random variables

$$
\begin{equation} \label{eq:conditional-random-variable}
X_{t \mid 1}=t x_1+(1-t) X_0 \quad \sim \quad p_{t \mid 1}\left(\cdot \mid x_1\right)=\mathcal{N}\left(\cdot \mid t x_1,(1-t)^2 I\right) .
\end{equation}
$$

Using these variables, we solve the ODE $\frac{d}{dt}X_{t|1} = u_t\left(X_{t|1}|x_1 \right)$ to obtain the **conditional velocity field**:

$$
\begin{equation} \label{eq:conditional-velocity-field}
u_t\left(x | x_1\right)= \frac{x_1 - x}{1 - t},
\end{equation}
$$

which generates the conditional probability path $p_{t | 1}(\cdot | x_1)$. Now, we can formulate a tractable version of the Flow Matching Loss in $\eqref{eq:flow-matching-loss}$, conditioned on a single target example $x_1$, known as the **conditional Flow Matching loss**:

$$
\begin{equation} \label{eq:conditional-flow-matching-loss}
\mathcal{L}_{\mathrm{CFM}}(\theta)=\mathbb{E}_{t, X_t, X_1}\left\|u_t^\theta\left(X_t\right)-u_t\left(X_t \mid X_1\right)\right\|^2, \text { where } t \sim U[0,1], X_0 \sim p, X_1 \sim q.
\end{equation}
$$

Remarkably, the objectives in $\eqref{eq:flow-matching-loss}$ and $\eqref{eq:conditional-flow-matching-loss}$ provide the same gradients to learn, _i.e.,_

$$
\begin{equation} \label{eq:gradient-equivalence}
\nabla_\theta \mathcal{L}_{\mathrm{FM}}(\theta)=\nabla_\theta \mathcal{L}_{\mathrm{CFM}}(\theta) .
\end{equation}
$$

Finally, by plugging $u_t(x|x_1)$ from $\eqref{eq:conditional-velocity-field}$ into $\eqref{eq:conditional-flow-matching-loss}$, we get the simplest implementation of FM:

$$
\begin{equation} \label{eq:conditional-flow-matching-loss-simple}
\mathcal{L}_{\text {CFM }}^{\text {OT,Gauss }}(\theta)=\mathbb{E}_{t, X_0, X_1}\left\|u_t^\theta\left(X_t\right)-\left(X_1-X_0\right)\right\|^2, \text { where } t \sim U[0,1], X_0 \sim \mathcal{N}(0, I), X_1 \sim q .
\end{equation}
$$

```execute-python
import torch 
from torch import nn, Tensor

import matplotlib.pyplot as plt
from sklearn.datasets import make_moons

class Flow(nn.Module):
    def __init__(self, dim: int = 2, h: int = 64):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(dim + 1, h), nn.ELU(),
            nn.Linear(h, h), nn.ELU(),
            nn.Linear(h, h), nn.ELU(),
            nn.Linear(h, dim))
    
    def forward(self, t: Tensor, x_t: Tensor) -> Tensor:
        return self.net(torch.cat((t, x_t), -1))
    
    def step(self, x_t: Tensor, t_start: Tensor, t_end: Tensor) -> Tensor:
        t_start = t_start.view(1, 1).expand(x_t.shape[0], 1)
        # For simplicity, using midpoint ODE solver in this example
        return x_t + (t_end - t_start) * self(t=t_start + (t_end - t_start) / 2, x_t= x_t + self(x_t=x_t, t=t_start) * (t_end - t_start) / 2)

        
flow = Flow()

optimizer = torch.optim.Adam(flow.parameters(), 1e-2)
loss_fn = nn.MSELoss()

for _ in range(10000):
    x_1 = Tensor(make_moons(256, noise=0.05)[0])
    x_0 = torch.randn_like(x_1)
    t = torch.rand(len(x_1), 1)
    
    x_t = (1 - t) * x_0 + t * x_1
    dx_t = x_1 - x_0
    
    optimizer.zero_grad()
    loss_fn(flow(t=t, x_t=x_t), dx_t).backward()
    optimizer.step()

x = torch.randn(300, 2)
n_steps = 8
fig, axes = plt.subplots(1, n_steps + 1, figsize=(30, 4), sharex=True, sharey=True)
time_steps = torch.linspace(0, 1.0, n_steps + 1)

axes[0].scatter(x.detach()[:, 0], x.detach()[:, 1], s=10)
axes[0].set_title(f't = {time_steps[0]:.2f}')
axes[0].set_xlim(-3.0, 3.0)
axes[0].set_ylim(-3.0, 3.0)

for i in range(n_steps):
    x = flow.step(x_t=x, t_start=time_steps[i], t_end=time_steps[i + 1])
    axes[i + 1].scatter(x.detach()[:, 0], x.detach()[:, 1], s=10)
    axes[i + 1].set_title(f't = {time_steps[i + 1]:.2f}')

plt.tight_layout()
get_image(fig)
```

**References**

[^1]: Yaron Lipman, Marton Havasi, Peter Holderrieth, Neta Shaul, Matt Le, Brian Karrer, Ricky T. Q. Chen, David Lopez-Paz, Heli Ben-Hamu, & Itai Gat. (2024). Flow Matching Guide and Code.
