# **Ordinary Differential Equations**

<span class="subtitle">
Fall 2024 | Author: Brandon Yang
</span>

---

## Introduction

An **ordinary differential equation (ODE)** is an equation that contains one or more functions of one independent variable and its derivatives. The **order** of an ODE is the highest derivative present in the equation.

<details open><summary>Solving an ODE</summary>

Solve for $y$:

$$
y'' = 1.
$$

We solve by integrating both sides:

$$
\begin{aligned}
y' &= \int 1 \, dx = x + C_1, \\
y &= \int x + C_1 \, dx = \frac{1}{2} x^2 + C_1 x + C_2.
\end{aligned}
$$

Given that our solution includes two constants, we have infinitely many solutions.

</details>

### Classification of ODEs

There are two ways to classify ODEs:

1. **By order**
2. **By linearity**

#### By Order

We can classify ODEs **by order**. For example:

$$
\begin{aligned}
y = y' &\quad \text{(1st order)} \\
y'' = 1 &\quad \text{(2nd order)} \\
y'' + y' = 5 &\quad \text{(2nd order)} \\
yy' = 1 &\quad \text{(1st order)} \\
y''' \ln(y)  + y^2 = \sin(y') &\quad \text{(3rd order)},
\end{aligned}
$$

where the order of an ODE is the highest derivative present.

<blockquote class="important">

We use the notation $y^{(n)}$ to denote the $n^{th}$ **derivative** of $y$, and we use the standard power notation $y^n$ to denote the $n^{th}$ power of $y$.

</blockquote>

<blockquote class="definition">

An $n^{th}$ order ODE is of the form:

$$
\begin{equation} \label{eq:ode}
F\left(x, y, y', y'', \ldots, y^{(n)} \right) = 0.
\end{equation}
$$

</blockquote>

#### By Linearity

We can also classify ODEs **by linearity**. For example:

$$
F(y, y') = y' - y
$$

is a linear ODE. We treat each $y^{(n)}$ term as a variable: $y'$ and $y$, and therefore, it can be written as a linear combination of these variables.

For a non-linear ODE, suppose we have:

$$
F(y, y', y'') = y'' + 5y^2 - \sin(x) = 0.
$$

In this case, we have three separate variables: $y$, $y'$, and $y''$. However, the term $5y^2$ has a power of 2, which makes the entire equation non-linear. We call this equation **non-linear in $y$**.

Another example is:

$$
5\ln(y') + y - \tan(x) = 0.
$$

This function is linear in $y$, but non-linear in $y'$, since the term $\ln(y')$ is non-linear.

<blockquote class="definition">

A **linear ODE** is of the form:

$$
\begin{equation} \label{eq:linear_ode}
a_n(x) y^{(n)} + a_{n-1}(x) y^{(n-1)} + \ldots + a_1(x) y' + a_0(x) y = F(x),
\end{equation}
$$

where $a_0(x), \ldots, a_n(x)$, and $F(x)$ are arbitrary differentiable functions that do not need to be linear.

</blockquote>
