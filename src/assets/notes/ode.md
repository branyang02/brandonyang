# **Ordinary Differential Equations**

<span class="subtitle">
Fall 2024 | Author: Brandon Y. Yang
</span>

---

## Background

<details><summary>Trig. Identities</summary>

### Trigonometric Identities

$$
\begin{equation} \label{eq:trig_identities}
\sin^2(x) + \cos^2(x) = 1.
\end{equation}
$$

</details>

<details><summary>Review for Calculus</summary>

### Differentiation

**Taylor Series**:

$$
\begin{equation} \label{eq:taylor_series}
f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \ldots + \frac{f^{(n)}(a)}{n!}(x-a)^n + \ldots.
\end{equation}
$$

**Product Rule for derivatives**:

$$
\begin{equation} \label{eq:product_rule}
(fg)' = f'g + fg'.
\end{equation}
$$

**Chain Rule for derivatives**:

$$
\begin{equation} \label{eq:chain_rule}
\frac{d}{dx} \left[ f(g(x)) \right] = f'(g(x)) g'(x).
\end{equation}
$$

**Fundamental Theorem of Calculus**:

$$
\begin{equation} \label{eq:ftc}
\frac{d}{dx} \int f(x) \, dx = f(x).
\end{equation}
$$

$$
\begin{equation} \label{eq:ftc2}
\frac{d}{dx} \int_a^{g(x)} f(x) \, dx = f(g(x)) g'(x).
\end{equation}
$$

$$
\begin{equation} \label{eq:ftc3}
\frac{d}{dx} \int_{h(x)}^{g(x)} f(x) \, dx = f(g(x)) g'(x) - f(h(x)) h'(x).
\end{equation}
$$

<details><summary>Differentiation Problems</summary>

<blockquote class="problem">

For example, suppose we want to evaluate the following derivative:

$$
\frac{d}{dx} \cos(x^2 + 1).
$$

</blockquote>

<blockquote class="proof">

We use the chain rule from $\eqref{eq:chain_rule}$:

$$
\begin{aligned}
\frac{d}{dx} \cos(x^2 + 1) &= -\sin(x^2 + 1) \cdot 2x \\
&= -2x \sin(x^2 + 1).
\end{aligned}
$$

</blockquote>

<blockquote class="problem">

Suppose we want to evaluate the following derivative:

$$
\frac{d}{dx} \left(x \cdot \cos(x^2 + 1)\right).
$$

</blockquote>

<blockquote class="proof">

We use the product rule from $\eqref{eq:product_rule}$:

$$
\begin{aligned}
\frac{d}{dx} \left(x \cdot \cos(x^2 + 1)\right) &= 1 \cdot \cos(x^2 + 1) + x \cdot -\sin(x^2 + 1) \cdot 2x \\
&= \cos(x^2 + 1) - 2x^2 \sin(x^2 + 1).
\end{aligned}
$$

</blockquote>

<blockquote class="problem">

Suppose we want to evaluate the following integral:

$$
\frac{d}{dx} \int_1^2 \left( \tan(x+100) - x \right) \, dx.
$$

</blockquote>

<blockquote class="proof">

Since we are solving for a definite integral, we know from $\eqref{eq:ftc3}$ that the solution is a constant:

$$
\int_1^2 \left( \tan(x+100) - x \right) \, dx = C,
$$

where $C$ is a constant. Therefore, the derivative of a constant is zero:

$$
\frac{d}{dx} \int_1^2 \left( \tan(x+100) - x \right) \, dx = 0.
$$

</blockquote>

<blockquote class="problem">

Suppose we have the following derivative:

$$
\frac{d}{dx} \int_0^x \sin^{-1}(s^2+1) \, ds.
$$

</blockquote>

<blockquote class="proof">

We use the Fundamental Theorem of Calculus from $\eqref{eq:ftc2}$:

$$
\begin{aligned}
\frac{d}{dx} \int_0^x \sin^{-1}(s^2+1) \, ds &= \sin^{-1}(x^2+1) \cdot 1 \\
&= \sin^{-1}(x^2+1).
\end{aligned}
$$

</blockquote>

<blockquote class="problem">

Suppose we have the following derivative:

$$
\frac{d}{dx} \int_{x^2 - 1}^{10} \cos(s) \, ds.
$$

</blockquote>

<blockquote class="proof">

We use the Fundamental Theorem of Calculus from $\eqref{eq:ftc3}$:

$$
\begin{aligned}
\frac{d}{dx} \int_{x^2 - 1}^{10} \cos(s) \, ds &= \cos(10) \cdot 0 - \cos(x^2 - 1) \cdot 2x \\
&= -2x \cos(x^2 - 1).
\end{aligned}
$$

</blockquote>

</details>

### Integration

**Integration by substitution**:

If $g(x)$ is a differentiable function and $f$ is a continuous function, then:

$$
\begin{equation} \label{eq:integration_by_substitution}
\int f(g(x)) g'(x) \, dx = \int f(u) \, du,
\end{equation}
$$

where $u = g(x)$ and $du = g'(x) dx$.

In a definite integral, suppose $g(x)$ is a differentiable function and $f$ is continuous on the interval $[a,b]$, then:

$$
\begin{equation} \label{eq:integration_by_substitution_definite}
\int_a^b f(g(x)) g'(x) \, dx = \int_{g(a)}^{g(b)} f(u) \, du,
\end{equation}
$$

where $u = g(x)$ and $du = g'(x) dx$.

**Integration by parts**:

$$
\begin{equation} \label{eq:integration_by_parts}
\int u \, dv = uv - \int v \, du.
\end{equation}
$$

**Table method for integration by parts**:

The table method for integration by parts is a technique used to solve integrals of the form:

$$
\int u \, dv,
$$

where $u$ is a polynomial of order $n$ and $dv$ is a function that can be integrated (e.g $e^x$, $cos(x)$). We construct the table as follows:

$$
\begin{array}{|c|c|}
\hline
\red u & dv \\
\hline
\blue{u'} & \red{\int dv} \\
\green{u''} & \blue{\int \int dv} \\
u''' & \green{\int \int \int dv}\\
\vdots & \vdots \\
0 & \dots \\
\hline
\end{array}
$$

where the first column contains the derivatives of $u$ and the second column contains the integrals of $dv$. We then perform cross-multiplication in the table and sum the terms with alternating signs:

$$
\int u \, dv = \red{\left(u \int dv\right)} - \blue{\left(u' \int \int dv\right)} + \green{\left(u'' \int \int \int dv\right)} - \ldots.
$$

For example, suppose we want to solve the following integral:

$$
\int (x^2 + 1) e^{-x} \, dx,
$$

First we assign $u$ and $dv$ following standard integration by parts:

$$
\begin{aligned}
u &= x^2 + 1, & dv &= e^{-x} \, dx, \\
du &= 2x \, dx, & v &= -e^{-x}.
\end{aligned}
$$

We then construct the table:

$$
\begin{array}{|c|c|}
\hline
 x^2 + 1 &  e^{-x} \\
\hline
2x & -e^{-x} \\
2 & e^{-x} \\
0 & -e^{-x} \\
\hline
\end{array}
$$

Finally, we perform cross-multiplication in the table:

$$
\begin{aligned}
\int (x^2 + 1) e^{-x} \, dx &= -(x^2 + 1) e^{-x} - 2xe^{-x} - 2e^{-x} + C.
\end{aligned}
$$

<details><summary>Integration Problems</summary>

<blockquote class="problem">

For example, suppose we want to solve the following integral:

$$
\int \left(2x^3 + 1\right)^7 (x^2) \, dx.
$$

</blockquote>

<blockquote class="proof">

Let $u = 2x^3 + 1$, thus $du = 6x^2 \, dx$, and $dx = \frac{1}{6x^2}du$. We can 'rewrite using $u$:

$$
\begin{aligned}
\int \left(u\right)^7 (x^2) \, \frac{1}{6x^2} du &= \frac{1}{6}\int u^7 \, du \\
&= \frac{1}{6}\left(\frac{1}{8}u^8\right) + C \\
&= \frac{1}{48} \left(2x^3+1\right)^8 + C.
\end{aligned}
$$

</blockquote>

<blockquote class="problem">

Suppose we have the same integral but we assign bounds:

$$
\int_1^2 \left(2x^3 + 1\right)^7 (x^2) \, dx.
$$

</blockquote>

<blockquote class="proof">

We follow the same $u$-substitution with $u = 2x^3 + 1$, but we assign new bounds for $u$

$$
\begin{aligned}
\int_1^2 \left(2x^3 + 1\right)^7 (x^2) \, dx &= \frac{1}{6}\int_{2(1)^3 + 1}^{2(2)^3 + 1} u^7 \, du \\
&= \frac{1}{6}\int_{3}^{17} u^7 \, du \\
&= \frac{1}{48} [u]_3^17 \\
&= \frac{1}{48} (17^8 - 3^8)
\end{aligned}
$$

</blockquote>

</details>

</details>

## Introduction to ODEs

An **ordinary differential equation (ODE)** is an equation that contains one or more functions of one independent variable and its derivatives. For example, the following are ODEs:

$$

\begin{aligned}
&y = y' \\
&y'' + \sin(y) = 0 \\
&e^x y' + \cos(x) = 0,
\end{aligned}

$$

where $y$ is the dependent variable and $x$ is the independent variable. The general form of an ODE is:

$$

F(x, y, y', y'', \ldots, y^{(n)}) = 0,

$$

where $F$ is a function of $x$ and $y$ and its derivatives.

<blockquote class="important">

We use the notation $y^{(n)}$ to denote the $n^{th}$ **derivative** of $y$, and we use the standard power notation $y^n$ to denote the $n^{th}$ power of $y$.

</blockquote>

<details><summary>Solving an ODE</summary>

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

<blockquote class="problem" id="simple-ode">

Find the solution $y$:

$$

y' = y, \quad y(1) = 2.

$$

</blockquote>

<blockquote class="proof">

We solve by differentiating $y'$:

$$

\begin{aligned}
y' = C e^x.
\end{aligned}

$$

where we then solve for $C$ using the initial condition $y(1) = 2$:

$$

\begin{aligned}
2 = C e^1 \implies C = 2e^{-1}.
\end{aligned}

$$

Therefore, the solution is:

$$

\begin{aligned}
y = 2e^{-1} e^x = 2e^{x-1}.
\end{aligned}

$$

</details>

### Classification of ODEs

<span class="subtitle">

Section 1.3 in BOYCE, DIPRIMA.

</span>

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
y''' \ln(y) + y^2 = \sin(y') &\quad \text{(3rd order)},
\end{aligned}

$$

where the order of an ODE is the highest derivative present.

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

Another example is:

$$

yy' + 10x = 0.

$$

This function is linear, since we treat each variable $y$ and $y'$ as separate variables one at the time, and both $y$ and $y'$ are linear.

<blockquote class="definition">

A **linear ODE** is of the form:

$$

\begin{equation} \label{eq:linear-ode}
a_n(x) y^{(n)} + a*{n-1}(x) y^{(n-1)} + \ldots + a_1(x) y' + a_0(x) y = F(x),
\end{equation}

$$

where $a_0(x), \ldots, a_n(x)$, and $F(x)$ are arbitrary differentiable functions that do not need to be linear.

</blockquote>

#### ODE Verification

To verify an ODE, we are usually given a solution of the ODE in the form of $y = f(x)$. We follow the following steps to verify the solution:

1. Solve for $y'$, or whatever derivative is present in the ODE.
2. Substitute the derivative back into the ODE.
3. Simplify the equation to verify that the solution satisfies the ODE.

<blockquote class="problem">

Verify $y = x$ satisfies the ODE $y'=1$.

</blockquote>

<blockquote class="proof">

We solve this by finding $y' = 1$, which satisfies the ODE.

</blockquote>

<details><summary>ODE Verification Examples</summary>

<blockquote class="problem">

Verify that the given function $y$ is a solution of the ODE:

$$

y' - 2ty = 1, \quad y = e^{t^2}\int_0^t e^{-s^2} \, ds + e^{t^2}.

$$

</blockquote>

<blockquote class="proof">

We take the derivative of $y$:

$$

y' = \frac{d}{dt} \left( e^{t^2}\int_0^t e^{-s^2} \, ds + e^{t^2} \right)

$$

We use the product rule in $\eqref{eq:product_rule}$:

$$

e^{t^2} \cdot \frac{d}{dt} \int_0^t e^{-s^2} \, ds + \frac{d}{dt} e^{t^2} \cdot \int_0^t e^{-s^2} \, ds + \frac{d}{dt} e^{t^2}.

$$

Solving the first term using the Fundamental Theorem of Calculus in $\eqref{eq:ftc2}$:

$$

\begin{aligned}
e^{t^2} \cdot \frac{d}{dt} \int_0^t e^{-s^2} \, ds &= e^{t^2} \cdot e^{-t^2} \cdot 1 = 1, \\
\end{aligned}

$$

Similarly, solving the second term using the chain rule in $\eqref{eq:chain_rule}$:

$$

\frac{d}{dt} e^{t^2} \cdot \int_0^t e^{-s^2} \, ds = 2te^{t^2} \cdot \int_0^t e^{-s^2} \, ds.

$$

Finally, solving the third term:

$$

\frac{d}{dt} e^{t^2} = 2te^{t^2}.

$$

Combining all terms:

$$

\begin{aligned}
y' &= 1 + 2te^{t^2} \cdot \int_0^t e^{-s^2} \, ds + 2te^{t^2}
\end{aligned}

$$

Finally, we substitute $y'$ back into the ODE:

$$

\begin{aligned}
y' - 2ty &= 1 \\
1 + \left(2te^{t^2} \cdot \int_0^t e^{-s^2} \, ds + 2te^{t^2}\right) - 2t\left( e^{t^2}\int_0^t e^{-s^2} \, ds + e^{t^2}\right) &= 1 \\
1 + \left(2te^{t^2} \cdot \int_0^t e^{-s^2} \, ds + 2te^{t^2}\right) - \left(2t e^{t^2}\int_0^t e^{-s^2} \, ds - 2te^{t^2}\right) &= 1 \\
1 &= 1.
\end{aligned}

$$

Therefore, the function $y$ satisfies the ODE.

</blockquote>

</details>

## First Order Differential Equations

Following the definitions of order and linearity in $\eqref{eq:ode}, \eqref{eq:linear-ode}$, we focus on solving **first-order** ODEs in this section.

<blockquote class="definition">

A **first-order ODE** is of the form:

$$
\begin{equation} \label{eq:first-order-ode}
\frac{dy}{dt} = f(t, y),
\end{equation}
$$

where where $f$ is a given function of two variables.

</blockquote>

Any _differentiable function_ $y = \phi(t)$ that satisfies this equation for all $t$ in some interval is called a solution, and our objective is to determine whether such functions exist and, if so, to develop methods for finding them.

The following are methods for solving first-order ODEs:

1. **Separable ODEs**
2. **The Method of Integrating Factors**
3. **Exact ODEs**

### Separable ODEs

<span class="subtitle">

Section 2.2 in BOYCE, DIPRIMA.

</span>

We solved a [simple ODE](#simple-ode) initially by using direct integration, but we can also solve ODEs by separating variables.

First, we need to identify the ODE as a **separable ODE**. Expanding on the definition of a first-order ODE in $\eqref{eq:first-order-ode}$, we have the following definition:

<blockquote class="definition">

A **separable ODE** is of the form:

$$
\begin{equation} \label{eq:separable-ode}
\frac{dy}{dt} = g(t)h(y),
\end{equation}
$$

where $g(t)$ is a function of $t$ and $h(y)$ is a function of $y$.

</blockquote>

To solve a separable ODE, we follow these steps:

1. **Separate variables** by moving all terms with $y$ to one side and all terms with $t$ to the other side.
2. **Integrate both sides** to solve for $y$.

For example, consider the following ODE:

$$
\frac{dy}{dx} = y' = y.
$$

We observe that in the from of $\eqref{eq:separable-ode}$, $g(t) = 1$ and $h(y) = y$. We can separate the variables by dividing both sides by $y$:

$$
\begin{align}
\frac{1}{y} \; dy &= dx.
\end{align}
$$

Next we integrate both sides:

$$
\begin{align}
\int \frac{1}{y} \; dy &= \int dx \\
\ln|y| + C_1 &= x + C_2 \\
\ln|y| &= x + C \\
e^{\ln|y|} &= e^{x + C} \\
y &= e^{x + C} \\
y &= e^x e^C \\
y &= Ce^x.
\end{align}
$$

<details><summary>Separable ODE Examples</summary>

<blockquote class="problem">

Find the general solution of ODE:

$$

y'e^x = x^2 + 1.

$$

</blockquote>

<blockquote class="proof">

We solve by using techniques from separable ODEs. We first replace $y'$ with $\frac{dy}{dx}$:

$$
\begin{aligned}
\frac{dy}{dx} e^x &= x^2 + 1.
\end{aligned}
$$

We then separate variables through multiplication:

$$
\begin{aligned}
\frac{dy \;e^x}{dx} &= \frac{x^2 + 1}{1} \\
dy &= (x^2 + 1) e^{-x} \; dx.
\end{aligned}
$$

Finally, we integrate both sides:

$$

\begin{align}
\int dy &= \int (x^2 + 1) e^{-x} dx \\
y + C_1 &= \int (x^2 + 1) e^{-x} dx. \label{seq:2}
\end{align}

$$

We solve the integral on the right side by integration by parts:

$$

\begin{aligned}
u &= x^2 + 1, & dv &= e^{-x} dx, \\
du &= 2x \; dx, & v &= -e^{-x}.
\end{aligned}

$$

Therefore, plugging back into $\eqref{seq:2}$:

$$

\begin{align}
\int (x^2 + 1) e^{-x} dx &= -(x^2 + 1) e^{-x} - \int -2x e^{-x} dx \\
&= -(x^2 + 1) e^{-x} + 2 \int x e^{-x} dx. \label{seq:3}
\end{align}

$$

We solve the integral on the right side by integration by parts again:

$$

\begin{aligned}
u &= x, & dv &= e^{-x} dx, \\
du &= dx, & v &= -e^{-x}.
\end{aligned}

$$

Therefore, the integral becomes:

$$

\begin{align}
\int x e^{-x} dx &= -xe^{-x} - \int -e^{-x} dx \\
&= -xe^{-x} + \int e^{-x} dx \\
&= -xe^{-x} - e^{-x} + C.
\end{align}

$$

Substituting the integral back into $\eqref{seq:3}$:

$$

\begin{align}
\int (x^2 + 1) e^{-x} dx &= -(x^2 + 1) e^{-x} + 2 \int x e^{-x} dx \\
&= -(x^2 + 1) e^{-x} + 2 \left( -xe^{-x} - e^{-x} + C \right) \\
&= -(x^2 + 1) e^{-x} - 2xe^{-x} - 2e^{-x} + 2C.
\end{align}

$$

Finally, we substitute the integral back into the original equation in $\eqref{seq:2}$:

$$

\begin{align}
y + C_1 &= \int (x^2 + 1) e^{-x} dx \\
y + C_1 &= -(x^2 + 1) e^{-x} - 2xe^{-x} - 2e^{-x} + 2C.
\end{align}

$$

We can remove redundant constants by combining them into a single constant and solve for $y$:

$$
\begin{align}
y &= -(x^2 + 1) e^{-x} - 2xe^{-x} - 2e^{-x} + C.
\end{align}
$$

</blockquote>

<blockquote class="problem">

Find the solution of the I.V.P.:

$$
\begin{equation}
y' = \frac{x}{y(x^2+1)}, \quad y(1) = 1. \label{ivp:1}
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We first rewrite the I.V.P. as a separable ODE:

$$
\begin{align}
\frac{dy}{dx} &= \frac{x}{y(x^2+1)}. \label{ivp:2} \\
y \, dy &= \frac{x}{(x^2+1)} \, dx. \label{ivp:3}
\end{align}
$$

Next we take the integral of both sides:

$$
\begin{align}
\int y \, dy &= \int \frac{x}{(x^2+1)} \, dx \label{ivp:4}
\end{align}
$$

We use u-substitution to solve for the right side of $\eqref{ivp:4}$, with $u = x^2 + 1$ and $\frac{du}{dx} = 2x$:

$$
\begin{align}
\int \frac{x}{(x^2+1)} \, dx &= \int \frac{x}{u} \, \frac{du}{2x} \\
&= \frac{1}{2} \int \frac{1}{u} du \\
&= \frac{1}{2} \ln|u| + C \\
&= \frac{1}{2} \ln|x^2 + 1| + C.
\end{align}
$$

Substituting back into $\eqref{ivp:4}$:

$$
\begin{align}
\int y \, dy &= \int \frac{x}{(x^2+1)} \, dx \\
\frac{1}{2}y^2 + C_1 &= \frac{1}{2} \ln|x^2 + 1| + C_2 \\
y^2 &= \ln|x^2 + 1| + C.
\end{align}
$$

Next, we solve for $C$ using the initial condition $\eqref{ivp:1}$. First we need to take the square root of both sides:

$$
\begin{align}
y &= \pm \sqrt{\ln(x^2 + 1) + C} \label{ivp:5}
\end{align}
$$

Substituting the initial condition $y(1) = 1$ into $\eqref{ivp:5}$:

$$
\begin{align}
1 &= \pm \sqrt{\ln(1^2 + 1) + C} \\
1 &=  \sqrt{\ln(2) + C} \\
1 &= \sqrt{\ln(2) + C} \\
1 &= \ln(2) + C \\
C &= 1 - \ln(2)
\end{align}
$$

Therefore, the solution to the I.V.P. is:

$$
\begin{align}
y &= \sqrt{\ln(x^2 + 1) + 1 - \ln(2)}.
\end{align}
$$

</blockquote>

<blockquote class="problem">

Find the solution of the I.V.P.:

$$
y'e^{y+1} = \cos(3x), \quad y(\pi) = -1.
$$

</blockquote>

<blockquote class="proof">

We first rewrite the I.V.P. as a separable ODE:

$$
\begin{align}
\frac{dy}{dx} e^{y+1} &= \cos(3x) \\
e^{(y+1)} \, dy &= \cos(3x) \, dx \\
\int e^{(y+1)} \, dy &=  \int \cos(3x) \, dx \label{ivp:6}
\end{align}
$$

We then integrate both sides, we start by integrating the right side:

$$
\begin{align}
\int \cos(3x) \, dx &= \frac{1}{3} \sin(3x) + C \label{ivp:7}
\end{align}
$$

Next, we integrate the left side:

$$
\begin{align}
\int e^{(y+1)} \, dy &= \int e \, e^y \, dy \\
&= e \int e^y \, dy \\
&= e e^y + C \\
&= e^{y+1} + C \label{ivp:8}
\end{align}
$$

We substitute $\eqref{ivp:7}$ and $\eqref{ivp:8}$ back into $\eqref{ivp:6}$:

$$
\begin{align}
e^{y+1} + C_1 &= \frac{1}{3} \sin(3x) + C_2 \\
\ln(e^{y+1}) &= \ln\left(\frac{1}{3} \sin(3x) + C_2\right) \\
y + 1 &= \ln\left(\frac{1}{3} \sin(3x) + C\right) \label{ivp:9}
\end{align}
$$

We then use the initial condition $y(\pi) = -1$ to solve for $C$ in $\eqref{ivp:9}$:

$$
\begin{align}
0 &= \ln\left(\frac{1}{3} \sin(3\pi) + C\right)  \\
0 &= \ln \left(C \right) \\
C &= 1
\end{align}
$$

Therefore, the solution to the I.V.P. is:

$$
\begin{align}
y &= \ln\left(\frac{1}{3} \sin(3x) + 1\right) - 1.
\end{align}
$$

</blockquote>

<blockquote class="problem">

Find the solution of the I.V.P.:

$$
\begin{equation} \label{eq:general}
y' = \frac{3x^2 +4x - 4}{2y-4}, \quad y(0) = -4.
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We begin by separating the variables:

$$
\begin{align}
y' &= \frac{3x^2 +4x - 4}{2y-4} \\
\frac{dy}{dx} &= \frac{3x^2 +4x - 4}{2y-4} \\
\left(2y - 4\right) \, dy &=  \left(3x^2 + 4x - 4\right) \, dx \\
\end{align}
$$

We then integrate both sides:

$$
\begin{align}
\int \left(2y - 4\right) \, dy &=  \int \left(3x^2 + 4x - 4\right) \, dx \\
y^2 - 4y + C_1 &= x^3 + 2x^2 - 4x + C_2 \\
y^2 - 4y  &= x^3 + 2x^2 - 4x  + C \\
y^2 - 4y - x^3 - 2x^2 + 4x -C &= 0 \\
\end{align}
$$

We finally use quadratic formula $y = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ with the form $ay^2 + by + c = 0$ to solve for $y$:

$$
\begin{align}
y &= \frac{4 \pm \sqrt{16 - 4\left(1 \cdot \left(- x^3 - 2x^2 + 4x  - C\right)\right)}}{2} \\
y &= \frac{4 \pm \sqrt{16 + 4x^3 + 8x^2 - 16x + 4C}}{2} \\
y &= 2 \pm  \frac{1}{2} \sqrt{16 + 4x^3 + 8x^2 - 16x + 4C} \\
y &= 2 \pm   \sqrt{4 + x^3 + 2x^2 - 4x + C} \\
\end{align}
$$

We then use the initial condition in $\eqref{eq:general}$ to solve for $C$:

$$
\begin{align}
-4 &= 2 \pm   \sqrt{4 + C} \\
-6 &= \pm   \sqrt{4 + C} \\
36 &= 4 + C \\
C &= 32
\end{align}
$$

Therefore, the solution to the I.V.P. is:

$$
\begin{align}
y &= 2 -   \sqrt{4 + x^3 + 2x^2 - 4x + 32} \\
y &= 2 -   \sqrt{x^3 + 2x^2 - 4x + 36} \\
\end{align}
$$

</blockquote>

</details>

### Method of Integrating Factors

<span class="subtitle">

Section 2.1 in BOYCE, DIPRIMA.

</span>

Expanding on the definition of a first-order ODE in $\eqref{eq:first-order-ode}$, we have the following definition:

<blockquote class="definition">

A **first-order linear ODE** is of the form:

$$
\begin{equation} \label{eq:first-order-linear-ode}
\frac{dy}{dt} + p(t)y  = g(t),
\end{equation}
$$

where $p(t)$ and $g(t)$ are given functions of $t$.

</blockquote>

To solve a first-order linear ODE, we follow these steps:

1. **Rewrite the ODE** in the form of $\eqref{eq:first-order-linear-ode}$.
2. **Find the integrating factor** $\mu(t) = e^{\int p(t) \, dt}$.
3. **Multiply both sides** of the ODE by $\mu(t)$.
4. **Integrate both sides** to solve for $y$.

We follow the steps and solve for the ODE in the general form of $\eqref{eq:first-order-linear-ode}$:

$$
\begin{align}
\mu(t) \frac{dy}{dt} + \mu(t)p(t)y &= \mu(t)g(t) \\
\frac{d}{dt} \left( \mu(t)y \right) &= \mu(t)g(t) \\
\int \frac{d}{dt} \left( \mu(t)y \right) \, dt &= \int \mu(t)g(t) \, dt \\
\mu(t)y &= \int \mu(t)g(t) \, dt + C \\
y &= \frac{\int \mu(t)g(t) \, dt + C}{\mu(t)}.
\end{align}
$$

For example, consider the following first-order linear ODE:

$$
\begin{equation} \label{eq:linear-ode-example}
(4 + t^2) \frac{dy}{dt} + 2ty = 4t.
\end{equation}
$$

We first rewrite the ODE in the form of $\eqref{eq:first-order-linear-ode}$:

$$
\begin{align}
\frac{dy}{dt} + \frac{2t}{4 + t^2}y &= \frac{4t}{4 + t^2},
\end{align}
$$

where we observe that $p(t) = \frac{2t}{4 + t^2}$ and $g(t) = \frac{4t}{4 + t^2}$. We then find the integrating factor $\mu(t)$:

$$
\begin{align}
\mu(t) &= e^{\int \frac{2t}{4 + t^2} \, dt} \\
&= e^{\ln|4 + t^2|} \\
&= 4 + t^2.
\end{align}
$$

<blockquote class="note">

We ignore absolute value and the constant of integration $C$ in the integrating factor, since we only need the most general integrating factor.

</blockquote>

We then multiply both sides of the ODE by $\mu(t)$:

$$
\begin{align}
(4 + t^2) \frac{dy}{dt} + 2ty &= 4t \\
\frac{d}{dt} \left( (4 + t^2)y \right) &= 4t.
\end{align}
$$

Finally, we integrate both sides to solve for $y$:

$$
\begin{align}
\int \frac{d}{dt} \left( (4 + t^2)y \right) \, dt &= \int 4t \, dt \\
(4 + t^2)y &= 2t^2 + C \\
y &= \frac{2t^2 + C}{4 + t^2}.
\end{align}
$$

<details><summary>Integrating Factors Problems</summary>

<blockquote class="problem">

Find the solution of the I.V.P.:

$$
\begin{equation} \label{eq:ivp-1}
y' + \frac{1}{t}y = \cos(t), \quad y(\pi) = 1.
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We write the ODE in the form of $\eqref{eq:first-order-linear-ode}$, and add the integrating factor $\mu(t)$:

$$
\begin{align}
\mu(t) \frac{dy}{dt} + \frac{1}{t}\mu(t)y &= \mu(t)\cos(t). \label{eq:ivp-2}
\end{align}
$$

We want to choose $\mu(t)$ such that:

$$
\begin{align}
\frac{d}{dt}\left(\mu(t)y\right) = \mu(t)\frac{dy}{dt} + y\frac{d\mu(t)}{dt} &= \mu(t) \frac{dy}{dt} + \frac{1}{t}\mu(t)y \\
y\frac{d\mu(t)}{dt} &=  \frac{1}{t}\mu(t)y \\
\frac{1}{\mu(t)}d\mu(t) &= \frac{1}{t}dt.
\end{align}
$$

We then integrate both sides:

$$
\begin{align}
\int \frac{1}{\mu(t)}d\mu(t) &= \int \frac{1}{t}dt \\
\ln|\mu(t)| &= \ln|t| + C \\
\mu(t) &= e^{\ln|t| + C} \\
\mu(t) &= te^C \\
\mu(t) &= Ct.
\end{align}
$$

We choose $C = 1$ and use $\mu(t) = t$ as the **integrating factor**. We then rewrite $\eqref{eq:ivp-2}$ as:

$$
\begin{align}
t \frac{dy}{dt} + \frac{1}{t}ty &= t\cos(t) \\
\frac{d}{dt}\left(ty\right) &= t\cos(t).
\end{align}
$$

We then integrate both sides:

$$
\begin{align}
\int \frac{d}{dt}\left(ty\right) \, dt &= \int t\cos(t) \, dt \\
ty &= \int t\cos(t) \, dt \\
ty &= t\sin(t) + \cos(t) + C \\
y &= \sin(t) + \frac{\cos(t)}{t} + \frac{C}{t}.
\end{align}
$$

Given the initial condition $y(\pi) = 1$, we substitute $t = \pi$ and $y = 1$ into the solution:

$$
\begin{align}
1 &= \sin(\pi) + \frac{\cos(\pi)}{\pi} + \frac{C}{\pi} \\
1 &= 0 - \frac{1}{\pi} + \frac{C}{\pi} \\
1 &= \frac{C - 1}{\pi} \\
C &= \pi + 1.
\end{align}
$$

Therefore, the solution to the I.V.P. is:

$$
\begin{align}
y &= \sin(t) + \frac{\cos(t)}{t} + \frac{\pi + 1}{t}.
\end{align}
$$

</blockquote>

<blockquote class="problem">

Find the general solution of the differential equation

$$
\begin{equation}
\frac{dy}{dt} - 2y = 4-t.
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We add the integrating factor $\mu(t)$:

$$
\begin{align}
\mu(t)\frac{dy}{dt} - \mu(t)2y = \mu(t) (4-t).
\end{align}
$$

We solve for $\mu(t)$:

$$
\begin{align}
\frac{d}{dt}\left( \mu(t)y \right) = \mu(t)\frac{dy}{dt} + y\frac{d\mu(t)}{dt} &= \mu(t)\frac{dy}{dt} - 2\mu(t)y \\
\frac{d\mu(t)}{dt} &= -2\mu(t) \\
\end{align}
$$

We solve this by separating variables and integrating:

$$
\begin{align}
\frac{d\mu(t)}{dt} &= -2\mu(t) \\
\frac{1}{-2\mu(t)}d\mu(t) &= dt \\
\int \frac{1}{-2\mu(t)}d\mu(t) &= \int dt \\
-\frac{1}{2}\ln|\mu(t)| &= t + C \\
\ln|\mu(t)| &= -2t + C \\
\mu(t) &= e^{-2t + C} \\
\mu(t) &= e^Ce^{-2t} \\
\mu(t) &= Ce^{-2t}.
\end{align}
$$

We choose $C = 1$ and use $\mu(t) = e^{-2t}$ as the integrating factor:

$$
\begin{align}
e^{-2t}\frac{dy}{dt} - e^{-2t}2y &= e^{-2t} (4-t) \\
\frac{d}{dt}\left( e^{-2t}y \right) &= e^{-2t} (4-t).
\end{align}
$$

We integrate both sides:

$$
\begin{align}
\int \frac{d}{dt}\left( e^{-2t}y \right) \, dt &= \int e^{-2t} (4-t) \, dt\\
e^{-2t}y &= \int 4e^{-2t} - te^{-2t} \, dt \\
e^{-2t}y &= \frac{1}{2}e^{-2t}t-\frac{7}{4}e^{-2t}+C \\
y &= \frac{1}{2}t-\frac{7}{4}+Ce^{2t}.
\end{align}
$$

</blockquote>

<blockquote class="problem">

Find the general solution of:

$$
\begin{equation} \label{eq:ivp-3}
xy' - 2xy = x^3 + 1.
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We first rewrite the ODE in the standard form of $\eqref{eq:first-order-linear-ode}$:

$$
\begin{align}
\frac{dy}{dx} - 2y = \frac{x^3+1}{x}
\end{align}
$$

Using the formula for the integrating factor, we find that $p(t) = -2$, therefore $\mu(t) = e^{\int -2 \, dx} = e^{-2x}$. We then multiply both sides by $\mu(t)$:

$$
\begin{align}
e^{-2x}\frac{dy}{dx} - 2e^{-2x}y &= e^{-2x}\frac{x^3+1}{x} \\
\frac{d}{dx}\left(e^{-2x}y\right) &= e^{-2x}\frac{x^3+1}{x}.
\end{align}
$$

We then integrate both sides:

$$
\begin{align}
\int \frac{d}{dx}\left(e^{-2x}y\right) \, dx &= \int e^{-2x}\frac{x^3+1}{x} \, dx \\
e^{-2x}y &= \int e^{-2x}\frac{x^3+1}{x} \, dx \\
y &= e^{2x}\int e^{-2x}\frac{x^3+1}{x} \, dx.
\end{align}
$$

</blockquote>

<blockquote class="problem">

Find the general solution of ODE:

$$
\begin{equation}
t \ln(t) \frac{dy}{dt} + y = te^t.
\end{equation}
$$

</blockquote>

<blockqoute class="proof">

We first rewrite the equation in standard format $\eqref{eq:first-order-linear-ode}$:

$$
\begin{align}
\frac{dy}{dt} + \frac{y}{t\ln(t)} &= \frac{te^t}{t\ln(t)} \\
\frac{dy}{dt} + \frac{y}{t\ln(t)} &= \frac{e^t}{\ln(t)}.
\end{align}
$$

We find that $p(t) = \frac{1}{t\ln(t)}$ and we solve for the integrating factor $\mu$(t) using the formula $\eqref{eq:first-order-linear-ode}$:

$$
\begin{align}
\mu(t) &= e^{\int \frac{1}{t\ln(t)} \, dt} \\
\mu(t) &= e^{\ln(\ln(t))} \\
\mu(t) &= \ln(t).
\end{align}
$$

We then multiply both sides by $\mu(t)$:

$$
\begin{align}
\ln(t)\frac{dy}{dt} + \ln(t)\frac{y}{t\ln(t)} &= \ln(t)\frac{e^t}{\ln(t)} \\
\frac{d}{dt}\left(\ln(t)y\right) &= e^t.
\end{align}
$$

We then integrate both sides:

$$
\begin{align}
\int \frac{d}{dt}\left(\ln(t)y\right) \, dt &= \int e^t \, dt \\
\ln(t)y &= e^t + C \\
y &= \frac{e^t}{\ln(t)} + \frac{C}{\ln(t)}.
\end{align}
$$

</blockquote>

<blockquote class="problem">

Find the general solution of ODE:

$$
\begin{equation}
4x^3y + x^4y' = \sin^3(x).
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We first rewrite the equation in the form $\eqref{eq:first-order-linear-ode}$:

$$
\begin{align}
x^4\frac{dy}{dx}  + 4x^3y  &= \sin^3(x) \\
\frac{dy}{dx}  + \frac{4x^3y}{x^4}  &= \frac{\sin^3(x)}{x^4} \\
\frac{dy}{dx}  + \frac{4y}{x}  &= \frac{\sin^3(x)}{x^4} \label{eq:example-fact-1}.
\end{align}
$$

We see find that $p(t) = \frac{4}{x}$, and we solve for the integrating factor $\mu$ using the formula $\eqref{eq:first-order-linear-ode}$:

$$
\begin{align}
\mu &= e^{\int \frac{4}{x} \, dx} \\
\mu &= e^{4\ln(x)} \\
\mu &= x^4.
\end{align}
$$

We then multiply both sides by $\mu$ in $\eqref{eq:example-fact-1}$:

$$
\begin{align}
x^4\frac{dy}{dx}  + 4x^3y  &= \sin^3(x) \\
\frac{d}{dx}\left(x^4y\right)  &= \sin^3(x).
\end{align}
$$

We then integrate both sides:

$$
\begin{align}
\int \frac{d}{dx}\left(x^4y\right) \, dx  &= \int \sin^3(x) \, dx \\
x^4y  &= \int \sin^3(x) \, dx \\
\end{align}
$$

We can solve the integral using $\eqref{eq:trig_identities}$:

$$
\begin{align}
\int \sin^3(x) \, dx &= \int \sin^2(x)\sin(x) \, dx \\
&= \int (1 - \cos^2(x))\sin(x) \, dx.
\end{align}
$$

We use the substitution $u = \cos(x)$:

$$
\begin{aligned}
u &= \cos(x) \\
du &= -\sin(x) \, dx \\
dx &= -\frac{du}{\sin(x)}.
\end{aligned}
$$

We then substitute back into the integral:

$$
\begin{align}
\int (1 - \cos^2(x))\sin(x) \, dx &= \int (1 - u^2) \sin(x) \, \frac{du}{-\sin(x)} \\
&= -\int (1 - u^2) \, du \\
&= - \left(u - \frac{u^3}{3}\right) + C \\
&= -\cos(x) + \frac{\cos^3(x)}{3} + C.
\end{align}
$$

Therefore, the solution to the ODE is:

$$
\begin{align}
x^4y &= -\cos(x) + \frac{\cos^3(x)}{3} + C \\
y &= -\frac{\cos(x)}{x^4} + \frac{\cos^3(x)}{3x^4} + \frac{C}{x^4}.
\end{align}
$$

</blockquote>

</details>

### Non-Linear 1st Order ODEs

Suppose we have a non-linear first-order ODE in following general form:

$$
\begin{equation} \label{eq:non-linear-ode}
y' + p(x)y = g(x)y^n,
\end{equation}
$$

where $n$ is a positive integer, and $g(x)y^n$ is the non-linear term. We can solve this ODE by rewriting it into a linear ODE in the following form:

$$
\begin{equation} \label{eq:non-linear-u-sub}
u' + p(x)u = g(x),
\end{equation}
$$

where $u$ is some function of $y$: $u = f(y)$. We divide both sizes of $\eqref{eq:non-linear-ode}$ by $y^n$ to match the form in $\eqref{eq:non-linear-u-sub}$.

$$
\begin{align}
\frac{y'}{y^n} + p(x)\frac{y}{y^n} &= g(x) \\
y^{-n}y' + p(x)y^{1-n} &= g(x) \label{eq:non-linear-ode-2}.
\end{align}
$$

Therefore, we find that $u = y^{1-n}$. Next, we solve for $u'$ and $y'$:

$$
\begin{align}
u &= y^{1-n} \implies u' = (1-n)y^{-n}y' \implies y' = \frac{u'}{(1-n)y^{-n}}.
\end{align}
$$

Next, we substitute $y'$ and $u = y^{1-n}$ into $\eqref{eq:non-linear-ode-2}$:

$$
\begin{align}
y^{-n} \frac{u'}{(1-n)y^{-n}} + p(x)u &= g(x) \\
\frac{u'}{1-n} + p(x)u &= g(x) \\
u' + (1-n)p(x)u &= (1-n)g(x).
\end{align}
$$

We can then solve for $u$ using either separable ODE or integrating factor methods. Once we find $u$, we can solve for $y$ by substituting $u = y^{1-n}$.

For example, consider the following non-linear ODE:

$$
\begin{equation} \label{eq:non-linear}
y' + \sin(x)y = y^4.
\end{equation}
$$

where $y^4$ is the non-linear term, we first divide both sides by $y^4$ to match the form in $\eqref{eq:non-linear-u-sub}$:

$$
\begin{align}
\frac{y'}{y^4} + \frac{\sin(x)}{y^3} &= 1 \label{eq:non-linear-2}.
\end{align}
$$

We see that $u = \frac{1}{y^3}$, and we can solve for $u'$ and $y'$:

$$
\begin{align}
u &= \frac{1}{y^3} = y^{-3} \\
u' &= -3y^{-4}y' \\
y' &= \frac{u'}{-3y^{-4}} = - \frac{1}{3} y^4 u'.
\end{align}
$$

We can then substitute $y'$ into $\eqref{eq:non-linear-2}$:

$$
\begin{align}
\frac{- \frac{1}{3} y^4 u'}{y^4} + \sin(x) u &= 1 \\
- \frac{1}{3} u' + \sin(x) u &= 1.
\end{align}
$$

Now this becomes a linear ODE, and we can solve for $u$ and then $y$.

$$
\begin{aligned}
- \frac{1}{3} u' + \sin(x) u &= 1 \implies u' + -3\sin(x)u = -3 \\
\mu(x) = e^{\int -3\sin(x) \, dx} &= e^{3\cos(x)} \\
\frac{d}{dx}\left(e^{3\cos(x)}u\right) &= -3e^{3\cos(x)} \\
\int \frac{d}{dx}\left(e^{3\cos(x)}u\right) dx &= \int -3e^{3\cos(x)}dx \\
e^{3\cos(x)}u &= \int -3e^{3\cos(x)}dx \\
u &= \frac{1}{e^{3\cos(x)}}\int -3e^{3\cos(x)}dx \\
u &= -3e^{-3\cos(x)} \int e^{3\cos(x)}dx.
\end{aligned}
$$

Since $u = \frac{1}{y^3}$, we get $y = \sqrt[3]{1/u}$. Therefore, we get the general solution for $y$ as:

$$
\begin{align}
y = \sqrt[3]{\frac{1}{-3e^{-3\cos(x)} \int e^{3\cos(x)}dx}}
\end{align}
$$

<details><summary>Non-Linear ODEs Problems</summary>

<blockquote class="problem">
Find the solution of the ODE:

$$
\begin{equation} \label{eq:non-linear-problem}
y' = 5y + e^{-2x} \cdot y^{-2}, \quad y(0) = 2.
\end{equation}
$$

</blockquote>

<blockquote class="proof">

We divide both sides by $y^{-2}$ to get the form of $u' + p(x) u = g(x)$ and find $u$:

$$
\begin{align}
y' &= 5y + e^{-2x} \cdot  \\
\frac{1}{y^{-2}}y' - \frac{1}{y^{-2}}5y &= e^{-2x} \\
y^2y' - 5y^3 &= e^{-2x}.
\end{align}
$$

This implies that $u = y^3$ and $u' = 3y^2y' \implies y' = \frac{u'}{3y^2}$. We substitute $y'$ into the ODE:

$$
\begin{align}
y^2\frac{u'}{3y^2} - 5u &= e^{-2x} \implies \frac{1}{3} u' - 5u &= e^{-2x}.
\end{align}
$$

We solve by finding the integrating factor $\mu(x)$:

$$
\begin{align}
\frac{1}{3} u' - 5u &= e^{-2x} \implies u' - 15u = 3e^{-2x} \\
\mu(x) = e^{\int -15 \, dx} &= e^{-15x} \\
e^{-15x}u' - e^{-15x}15u &= 3e^{-15x}e^{-2x} \implies \frac{d}{dx}\left(e^{-15x} \cdot u \right) = 3e^{-15x}e^{-2x} \\
\int \frac{d}{dx}\left(e^{-15x} \cdot u \right) dx &=  \int 3e^{-15x}e^{-2x} dx \\
e^{-15x} \cdot u &= \int 3e^{-17x} dx = -\frac{3}{17}e^{-17x}+C \\
u &= e^{15x} \left(-\frac{3}{17}e^{-17x}+C  \right) \\
u &= -\frac{3}{17}e^{-2x}+Ce^{15x}.
\end{align}
$$

Since $u = y^3$, this means $y = \sqrt[3]{u}$, and we substitute $u$ back into the solution:

$$
\begin{align}
y &= \sqrt[3]{-\frac{3}{17}e^{-2x}+Ce^{15x}}.
\end{align}
$$

Finally we solve for $C$ given the initial condition $y(0) = 2$:

$$
\begin{align}
2 &= \sqrt[3]{-\frac{3}{17}e^{-2(0)}+Ce^{15(0)}} \\
2 &= \sqrt[3]{-\frac{3}{17}+C} \\
8 &= -\frac{3}{17}+C \\
C &= \frac{139}{17}.
\end{align}
$$

Therefore, the solution to the ODE is:

$$
\begin{align}
y &= \sqrt[3]{-\frac{3}{17}e^{-2x}+  \frac{139}{17}  e^{15x}}.
\end{align}
$$

</blockquote>

</details>

### Modeling with 1st ODEs

<span class="subtitle">

Section 2.3 in BOYCE, DIPRIMA.

</span>

#### Mixing Problems

The mixing problem usually involves a tank with a certain amount of solution and a rate of flow of a different solution into the tank. The rate of flow of the solution into the tank is proportional to the difference between the concentration of the solution in the tank and the concentration of the solution flowing in. We follow the general form of the mixing problem:

$$
\begin{equation} \label{eq:mixing-problem}
\frac{dQ}{dt} = \text{rate in} - \text{rate out},
\end{equation}
$$

where $Q(t)$ is the amount of solution in the tank at time $t$.

<details><summary>Mixing Problems Problems</summary>

<blockquote class="problem">

At time $t = 0$ a tank contains $Q_0$ lb of salt dissolved in $100$ gal of water. Assume that water containing $\frac{1}{4}$ lb of salt per gallon is entering the tank at a rate of $r$ gal/min and that the well-stirred mixture is draining from the tank at the same rate. Set up the initial value problem that describes this flow process. Find the amount of salt $Q(t)$ in the tank at any time, and also find the limiting amount $Q_L$ that is present after a very long time. If $r = 3$ and $Q_0 = 2Q_L$, find the time $T$ after which the salt level is within $2$% of $Q_L$. Also find the flow rate that is required if the value of $T$ is not to exceed $45$ min.

</blockquote>

First, we are given the initial condition $Q(0) = Q_0$. We then set up the I.V.P., which is the rate of change of the amount of salt in the tank with respect to time. First, we find the rate of flow of the solution into the tank:

$$
\frac{1}{4} \frac{\text{lb}}{\text{gal}} \cdot r \frac{\text{gal}}{\text{min}} = \frac{r}{4} \frac{\text{lb}}{\text{min}}.
$$

Next, we find the rate of flow of the solution out of the tank:

$$
\frac{Q}{100} \frac{\text{lb}}{\text{gal}} \cdot r \frac{\text{gal}}{\text{min}} = \frac{rQ}{100} \frac{\text{lb}}{\text{min}}.
$$

Therefore, the rate of change of the amount of salt in the tank is:

$$
\begin{align*}
\frac{dQ}{dt} &= \frac{r}{4} - \frac{rQ}{100} \\
\end{align*}
$$

We solve for the I.V.P.

$$
\begin{align*}
\frac{dQ}{dt} + \frac{rQ}{100} &= \frac{r}{4}  \\
\mu(t) &= e^{\int \frac{r}{100} \, dt} = e^{\frac{rt}{100}} \\
\frac{d}{dt}\left(e^{\frac{rt}{100}}Q\right) &= e^{\frac{rt}{100}}\frac{r}{4} \\
e^{\frac{rt}{100}}Q &= \int e^{\frac{rt}{100}}\frac{r}{4} \, dt \\
Q &= \frac{1}{e^{\frac{rt}{100}}} \left(25e^{\frac{rt}{100}}+C\right) \\
Q &= 25 + Ce^{-\frac{rt}{100}}.
\end{align*}
$$

We then solve for $C$ using the initial condition $Q(0) = Q_0$:

$$
\begin{align*}
Q_0 &= 25 + Ce^{-\frac{r(0)}{100}} \\
Q_0 &= 25 + C \\
C &= Q_0 - 25.
\end{align*}
$$

Therefore, the solution to the I.V.P. is:

$$
\begin{align*}
Q &= 25 + (Q_0 - 25)e^{-\frac{rt}{100}}.
\end{align*}
$$

We find the limiting amount $Q_L$ that is present after a very long time by taking the limit as $t \to \infty$:

$$
\begin{align*}
Q_L &= 25 + (Q_0 - 25)e^{-\frac{r\infty}{100}} \\
Q_L &= 25.
\end{align*}
$$

Next, given $r=3$ and $Q_0 = 2Q_L$, we find the time $T$ after which the salt level is within $2$% of $Q_L$:

$$
\begin{align*}
25 + 0.02 Q_L &= 25 + (2Q_L - 25)e^{-\frac{3T}{100}} \\
T &= -\frac{\ln \left(0.02\right)}{0.03} \approx 130.4.
\end{align*}
$$

Next we find the flow rate that is required if the value of $T$ is not to exceed $45$ min:

$$
\begin{align*}
25 + 0.02 Q_L &= 25 + (2Q_L - 25)e^{-\frac{r(45)}{100}} \\
r &= -\frac{20\ln \left(0.02\right)}{9} \approx 8.69338.
\end{align*}
$$

</details>

#### Interest Problems

We can also model **continuously compounded interest** problems using first-order ODEs. Suppose $S(t)$ is the amount of money in an account at time $t$, and $r$ is the interest rate (could be weekly, monthly, or yearly). The rate of change of the value of the investment is $\frac{dS}{dt}$, and this quantity is equal to the rate $r$ times the amount of money in the account at time $t$:

$$
\begin{equation} \label{eq:interest-problem}
\frac{dS}{dt} = rS.
\end{equation}
$$

Suppose we let $S(0) = S_0$, then the solution to the I.V.P. is:

$$
\begin{align}
S(t) &= S_0e^{rt}.
\end{align}
$$

This also means that a bank account with continuously compounding interest grows exponentially.

We can also add in the rate of withdrawal or deposit to the account. In this case, it will look very similar to the mixing problem:

$$
\begin{equation} \label{eq:interest-problem-2}
\frac{dS}{dt} = \text{rate in} - \text{rate out}.
\end{equation}
$$

<details><summary>Interest Problems Problems</summary>

<blockquote class="problem">

A recent college graduate borrows 150K at an interest 6% to puchase a condo. The buyer expects to make payments at a rate $800 + 10t$ per month.

- When will the load be paid off?
- How large a load could be paid off in exactly 20 years?

</blockquote>

**Part 1**: Suppose $y(t)$ is the amount of load at any time $t$ (months). We want to find the rate of change of the loan, which is the difference between the _rate of borrowing_ and the _rate of payment_:

- rate of borrowing: $0.06 \frac{\%}{year} \cdot \frac{1}{12}\frac{year}{months} \cdot y(t)$.
- rate of payment: $800 + 10t$.

Therefore, the rate of change of the loan is:

$$
\begin{align}
\frac{dy}{dt} &= \frac{0.06}{12}y(t) - (800 + 10t) \\
\frac{dy}{dt} - 0.005y(t)&= - 800 - 10t.
\end{align}
$$

And the initial condition is $y(0) = 150000$. We can then solve the I.V.P.

**Part 2**: We find the solution to the I.V.P. and then find $y(240)$.

</details>

#### Newton's Law of Cooling

Newton's Law of Cooling states that the temperature of an object changes at a rate proportional to the difference between its temperature and the surrounding temperature.

Suppose $T(t)$ is the temperature of the object at time $t$, we can model the law as:

$$
\begin{equation}
\frac{dT}{dt} \propto T - T_a = k(T - T_a),
\end{equation}
$$

where $T_a$ is the surrounding temperature and $k$ is a positive constant.

<details><summary>Newton's Law of Cooling Problems</summary>

<blockquote class="problem">

Suppose a cup of coffee obeys Newton's Law of Cooling with $T_a = 70$ and $T(0) = 200F$. If the coffee cools to $190F$ in $1$ minutes, when will it cool to $150F$?

</blockquote>

We model $T(t)$ as the temperature of the coffee at time $t$ and we have the initial condition $T(0) = 200$. We then model the ODE as:

$$
\begin{align}
\frac{dT}{dt} = k(T - 70)
\end{align}
$$

We then solve the I.V.P:

$$
\begin{aligned}
\frac{dT}{dt} &= k(T - 70) \implies \frac{dT}{dt} = kT - 70k \implies \frac{dT}{dt} - kT = - 70k \\
\mu(t) &= e^{\int -k \, dt} = e^{-kt} \implies \frac{d}{dt}\left(e^{-kt}T\right) = -70ke^{-kt} \\
\int \frac{d}{dt}\left(e^{-kt}T\right) \, dt &= \int -70ke^{-kt} \, dt \\
T(t) &= 70 + Ce^{kt}.
\end{aligned}
$$

We solve for $C$ using the initial condition $T(0) = 200$:

$$
\begin{align}
200 &= 70 + Ce^{k(0)} \\
130 &= Ce^0 \\
C &= 130.
\end{align}
$$

Therefore, the solution to the I.V.P. is:

$$
\begin{align}
T(t) &= 70 + 130e^{kt}.
\end{align}
$$

We then solve for $k$ using the condition that the coffee cools to $190F$ in $1$ minute:

$$
\begin{align}
190 &= 70 + 130e^{k(1)} \\
120 &= 130e^k \\
e^k &= \frac{120}{130} = \frac{12}{13} \\
k &= \ln\left(\frac{12}{13}\right).
\end{align}
$$

Finally, we solve for $t$ when the coffee cools to $150F$:

$$
\begin{align}
150 &= 70 + 130e^{\ln\left(\frac{12}{13}\right)t} \\
80 &= 130e^{\ln\left(\frac{12}{13}\right)t} \\
\frac{8}{13} &= e^{\ln\left(\frac{12}{13}\right)t} \\
\ln\left(\frac{8}{13}\right) &= \ln\left(\frac{12}{13}\right)t \\
t &= \frac{\ln\left(\frac{8}{13}\right)}{\ln\left(\frac{12}{13}\right)}.
\end{align}
$$

</details>

### Autonomous Differential Equations and Population Dynamics

<span class="subtitle">

Section 2.5 in BOYCE, DIPRIMA.

</span>

An **autonomous differential equation** is a differential equation where the independent variable does not appear explicitly.

<blockquote class="definition">

An **autonomous differential equation** is a differential equation of the form:

$$
\begin{equation} \label{eq:autonomous-ode}
\frac{dy}{dt} = f(y).
\end{equation}
$$

</blockquote>

One example is the **logistic growth model**, modeled by the following ODE:

$$
\begin{equation}
\frac{dP}{dt} = rP\left(1 - \frac{P}{k}\right), \quad r, k > 0.
\end{equation}
$$

where $P(t)$ is the population at time $t$, $r$ is the **growth rate** and $k$ is the **carrying capacity**.

We can find the critical points of the ODE by setting $\frac{dP}{dt} = 0$, where we find that $P = 0$ and $P = k$. These are also known as the **equilibrium points (solutions)**.

<blockquote class="definition">

An **equilibrium solution** of an autonomous differential equation in the form of $\eqref{eq:autonomous-ode}$ is a solution $y = y_0$ such that $f(y_0) = 0$.

</blockquote>

Suppose we define the ODE as a function:

$$
\begin{equation}
f(P) = rP\left(1 - \frac{P}{k}\right) \label{eq:logistic-ode},
\end{equation}
$$

we can see that $f(P) = 0$ at $P = 0$ and $P = k$. This means that the population function $P(t)$ grows in the interval $0 < P < k$. Similarly, the population function $P(t)$ decreases in the interval $k < P < \infty$. We can represent this using the red arrows in the graph below:

```tikz

\begin{document}

\begin{tikzpicture}[scale=1.0]
    % Define the parabolic curve based on the formula: f(y) = r y (1 - y/K)
    \draw[domain=0:5.8, smooth, variable=\y, thick, blue] 
        plot ({\y}, {2*\y*(1-\y/5)});
    
    % Draw the axes
    \draw[->] (-0.5,0) -- (5.8,0) node[right] {$P$};
    \draw[->] (0,-0.5) -- (0,3) node[above] {$f(P)$};

    % Points on the curve
    \filldraw[black] (0,0) circle (1pt);  % Point at (0,0)
    \filldraw[black] (5,0) circle (1pt);  % Point at (K,0)
    
    % Mark the top point (K/2, rK/4)
    \filldraw[black] (0, 2.5) node[left] {$rK/4$} circle (1pt);
    \filldraw[black] (2.5, 2.5) circle (1pt);
    
    % Labels for K/2 and K
    \draw[dashed] (2.5,2.5) -- (2.5,0) node[below] {$K/2$};
    \draw[dashed] (5,0) -- (5,0) node[below] {$K$};
    
    % rK/4 on the y-axis
    \draw[dashed] (0,2.5) -- (2.5,2.5);

    % Red arrows indicating movement
    \draw[->, thick, red] (0.1,0.2) -- (2.0,0.2);
    \draw[->, thick, red] (3.0,0.2) -- (4.8,0.2);
    \draw[<-, thick, red] (5.2,0.2) -- (5.8,0.2);
\end{tikzpicture}

\end{document}


```

<div class="caption" id="fig:logistic-ode">

Graph of the logistic growth model $f(P) = rP\left(1 - \frac{P}{k}\right)$.

</div>

We can solve the ODE by the method of integrating factors (or separation of variables and using partial fractions):

$$
\begin{align}
\frac{dP}{dt} &= rP\left(1 - \frac{P}{k}\right) = rP - \frac{rP^2}{k} \\
\frac{1}{P^2}\frac{dP}{dt} &= \frac{1}{P}r - \frac{1}{k} \implies \frac{1}{P^2}\frac{dP}{dt} - \frac{1}{P}r =  - \frac{1}{k} \\
u &= \frac{1}{P} \implies u' = -\frac{1}{P^2}P'\implies P' = -P^2u' \\
\frac{1}{P^2}\left(-P^2u'\right) -ur &= -\frac{1}{k}  \implies -u' -ur = -\frac{1}{k} \implies u' + ur = \frac{1}{k} \\
\mu(t) &= e^{\int r \, dt} = e^{rt} \implies \frac{d}{dt}\left(e^{rt}u\right) = \frac{1}{k}e^{rt} \\
\int \frac{d}{dt}\left(e^{rt}u\right) \, dt &= \int \frac{1}{k}e^{rt} \, dt \implies e^{rt}u = \frac{1}{rk}e^{rt} + C \\
u &= \frac{1}{rk} + Ce^{-rt} \implies P = \frac{1}{u} = \frac{rk}{1 + Ce^{-rt}}.
\end{align}
$$

Suppose we have initial condition $P(0) = P_0$, we can solve for $C$:

$$
\begin{align}
P_0 &= \frac{rk}{1 + Ce^{-r(0)}} = \frac{rk}{1 + C} \\
P_0(1 + C) &= rk \implies C = \frac{rk}{P_0} - 1.
\end{align}
$$

Therefore, the solution to the I.V.P. is:

$$
\begin{align}
P(t) &= \frac{rk}{1 + \left(\frac{rk}{P_0} - 1\right)e^{-rt}} = \frac{P_{0}k}{P_{0}+\left(k-P_{0}\right)e^{-rt}}.
\end{align}
$$

Therefore, we can plot the graph of $P(t)$ below, where the $x$-axis is $t$ and the $y$-axis is $P(t)$:

```desmos

\frac{P_{0}k}{P_{0}+\left(k-P_{0}\right)e^{-rx}}
y = 0
y = k

```

We can see that all initial conditions will converge to the carrying capacity $k$, which is our equilibrium solution. We can also take the limit as $t \to \infty$:

$$
\begin{align}
\lim_{t \to \infty} P(t) &= \lim_{t \to \infty} \frac{P_{0}k}{P_{0}+\left(k-P_{0}\right)e^{-rt}} = \frac{P_{0}k}{P_{0}+\left(k-P_{0}\right)0} = k.
\end{align}
$$

The solution $P(t) = k$ is known as the **asymptotically stable solution** of the ODE. On the other hand, the solution $P(t) = 0$ is known as the **unstable equilibrium solution**. We can verify this by looking at the red arrows and their directions in the graph of the [logistic growth model](#fig:logistic-ode) above.

### 1st Order ODEs Theory

#### Existence and Uniqueness of 1st Order Linear ODEs

<blockquote class="theorem" id="theorem-existence-1st-order-linear-odes">

If the functions $p$ and $g$ are continuous on an open interval $I: \alpha < t < \beta$ containing the point $t = t_0$, then there exists a unique solution $y = \phi(t)$ that satisfies the differential equation:

$$
\begin{equation} \label{eq:linear-ode-theorem}
y' + p(t)y = g(t)
\end{equation}
$$

for each $t$ in the interval $I$, and that also satisfies the initial condition

$$
\begin{equation} \label{eq:linear-ode-theorem-ic}
y(t_0) = y_0,
\end{equation}
$$

where $y_0$ is an arbitrary prescribed initial value.

</blockquote>

For example, consider the I.V.P.:

$$
ty' + 2y = 4t^2, \quad y(1) = 2.
$$

We can find the interval in which the I.V.P. has an unique solution.

We first rewrite the ODE in the standard from in $\eqref{eq:linear-ode-theorem}$:

$$
y' + \frac{2}{t}y = 4t,
$$

where we find $p(t) = \frac{2}{t}$ and $g(t) = 4t$. We can see that $p(t)$ is continuous in $t \in (-\infty, 0) \cup (0, \infty)$ and $y$ in $y \in (-\infty, \infty)$. We can also see that $g(t)$ is continuous in $t \in (-\infty, \infty)$. Therefore, we have two intervals $(-\infty, 0) \cup (0, \infty)$ where the solution is certain to exist. Given the initial condition $y(1) = 2$ is in the domain of the positive interval, we are certain that the solution exists in the interval $t \in (0, \infty)$.

After solve for the ODE, we find the solution to be:

$$
\begin{align}
y &= t^2 + \frac{1}{t^2}, \quad t > 0.
\end{align}
$$

which confirms that the solution exists in the interval $t \in (0, \infty)$.

<details><summary>Existence and Uniqueness of 1st Order Linear ODEs Problems</summary>

<blockquote class="problem">

Consider the I.V.P.:

$$
ty' + y = te^t, \quad y(5) = 0.
$$

Without solving, find the interval in $t$ where the I.V.P. has a unique solution.

</blockquote>

<blockquote class="proof">

We apply [Theorem 3.1](#theorem-existence-1st-order-linear-odes) to the I.V.P., and rearrange into the form $\eqref{eq:linear-ode-theorem}$:

$$
y' + \frac{1}{t}y = e^t.
$$

We find that $p(t) = \frac{1}{t}$ and $g(t) = e^t$. We observe that $p(t)$ is continuous in the domain $t \in (-\infty, 0) \cup (0, \infty)$ and $g(t)$ is continuous in the domain $t \in (-\infty, \infty)$. Given that the initial condiiton $t = 5$ is in the domain $t \in (0, \infty)$, we can conclude that the solution is certain to exist in the interval $t \in (0, \infty)$.

We can then solve the ODE and find the domain of the solution.

$$
\begin{align*}
y' + \frac{1}{t}y &= e^t \\
\mu(t) &= e^{\int \frac{1}{t} \, dt} = e^{\ln t} = t \\
t\frac{dy}{dt} + y &= te^t \implies \frac{d}{dt}\left(ty\right) = te^t \\
\int \frac{d}{dt}\left(ty\right) \, dt &= \int te^t \, dt \implies ty = te^t - e^t + C \\
y &= e^t - \frac{1}{t}e^t + \frac{C}{t} \implies 0 = e^5 - \frac{1}{5}e^5 + \frac{C}{5} \implies C=-4e^5 \\
y &= e^t - \frac{1}{t}e^t - \frac{4e^5}{t}.
\end{align*}
$$

The domain of the solution is $t \neq 0$, which is consistent with the domain of existence.

</blockquote>

<blockquote class="problem">

Consider the I.V.P.:

$$
y' + \frac{1}{\ln (t+1)}y = \frac{1}{t\ln(t+1)}, \quad y(10) = 5.
$$

</blockquote>

<blockqoute class="proof">

```desmos

\frac{1}{\ln (x+1)}
\frac{1}{x\ln(x+1)}

```

We observe that $p(t) = \frac{1}{\ln (t+1)}$ and $g(t) =  \frac{1}{t\ln(t+1)}$. We can see that $p(t)$ is continuous in the domain $t \in (-1, \infty)$ and $g(t)$ is continuous in the domain $t \in (-1, 0) \cup (0, \infty)$. We take the intersection of the two domains and find that the solution is certain to exist in the interval $t \in (-1, 0) \cup (0, \infty)$. Given that the initial condition $t = 10$ is in the domain $t \in (0, \infty)$, we can conclude that the solution is certain to exist in the interval $t \in (0, \infty)$.

</blockquote>

</details>

#### Existence and Uniqueness of 1st Order Non-Linear ODEs

<blockquote class="theorem" id="theorem-existence-1st-order-non-linear-odes">

Let the functions $ f $ and $ \frac{\partial f}{\partial y} $ be continuous in some rectangle $ \alpha < t < \beta, \gamma < y < \delta $ containing the point $ (t_0, y_0) $. Then, in some interval $ t_0 - h < t < t_0 + h $ contained in $ \alpha < t < \beta $, there is a unique solution $ y = \phi(t) $ of the initial value problem

$$
\begin{equation} \label{eq:non-linear-ode-theorem-form}
y' = f(t, y), \quad y(t_0) = y_0.
\end{equation}
$$

</blockquote>

Note that [Theorem 3.2](#theorem-existence-1st-order-non-linear-odes) reduces to [Theorem 3.1](#theorem-existence-1st-order-linear-odes) when $ f(t, y) $ is linear in $ y $.

To demonstrate [Theorem 3.2](#theorem-existence-1st-order-non-linear-odes), consider the I.V.P.:

$$
\frac{dy}{dx} = \frac{3x^2 + 4x + 2}{2(y - 1)}, \quad y(0) = -1.
$$

We first observe that the $y$ term is in the denominator, which makes the ODE non-linear. Given that the ODE is already in the form $\eqref{eq:non-linear-ode-theorem-form}$, where $f(x, y) = \frac{3x^2 + 4x + 2}{2(y - 1)}$, we can solve for $ \frac{\partial f}{\partial y} $:

$$
\begin{align}
\frac{\partial f}{\partial y} &= \frac{\partial}{\partial y}\left(\frac{3x^2 + 4x + 2}{2(y - 1)}\right) = \frac{-3x^2 - 4x - 2}{2(y - 1)^2}.
\end{align}
$$

We analyze the domain of $f$ and $ \frac{\partial f}{\partial y} $ in both $ x $ and $ y $:

- $f(x,y)$
  - $x \in (-\infty, \infty)$.
  - $y \in (-\infty, 1) \cup (1, \infty)$.
- $ \frac{\partial f}{\partial y} $
  - $x \in (-\infty, \infty)$.
  - $y \in (-\infty, 1) \cup (1, \infty)$.

We take the intersection of the two domains and find that the solution is certain to exist in the interval:

$$
x \in (-\infty, \infty), \quad y \in (-\infty, 1) \cup (1, \infty).
$$

We call this domain the **domain of existence**. Given that the initial point $(0, -1)$ is in the domain of existence, and the I.V.P. has a unique solution in some interval about $x = 0$.

Alternatively, suppose we have the initial condition $y(0) = 1$, the initial point now lies at the point $(0, 1)$, which is not in the domain of existence, and therefore we cannot apply [Theorem 3.2](#theorem-existence-1st-order-non-linear-odes) to find the solution. However, this does not mean whether the solution exists or not, but rather that we cannot apply the theorem to find the solution. When we solve for the I.V.P. with initial condition $y(0) = 1$, we find _two_ solutions:

$$
y=1+\sqrt{x\left(x^2+2x+2\right)},\:y=1-\sqrt{x\left(x^2+2x+2\right)}.
$$

<details><summary>Existence and Uniqueness Problems</summary>

<blockquote class="problem">

Without solving, find the domain where the solution is certain to exist:

$$
y^{-1}y = t^2+8, \quad y(0) = 1
$$

</blockquote>

<blockquote class="proof">

We rewrite the ODE in the form $y' + p(t)y = g(t)$:

$$
\begin{align}
y^{-1}y &= t^2+8 \\
y' - (t^2+8)y &= 0.
\end{align}
$$

We find that $p(t) = -(t^2+8)$ and $g(t) = 0$. We can see that $p(t)$ is continuous in $t$ and $y$ in the domain $R = \{(t, y) | |t - 0| \leq a, |y - 1| \leq b\}$. We can also see that $p(t)$ is Lipschitz continuous in $y$ in $R$. Therefore, the solution is certain to exist in some interval $|t - 0| \leq h$.

</blockquote>

<blockquote class="problem">

Check if the solution of the given I.V.P. is certain to exist:

$$
y' = y^2 + 1, \quad y(-1) = 8.
$$

</blockquote>

<blockquote class="proof">

We first observe that the ODE is **non-linear**. We rewrite the ODE in the form $y' = f(t, y)$, and find $\frac{\partial f}{\partial y}$

$$
y' = f(t, y) = y^2 + 1, \quad \frac{\partial f}{\partial y} = 2y.
$$

Since $f(t, y)$ is continuous in $t$ and $y$, and $\frac{\partial f}{\partial y}$ is continuous in $t$ and $y$. Therefore, the domain of continuity is the entire $t-y$ plane, and the solution is certain to exist.

We can further look at the initial condition $y(-1) = 8$. We can see that the initial condition is within the domain of continuity, and the solution is certain to exist.

We can solve the ODE and find the domain of existence.

$$
\begin{align*}
\frac{dy}{y^2 + 1} &= dt \\
\int \frac{dy}{y^2 + 1} &= \int dt \\
\tan^{-1}(y) &= t + C \\
y &= \tan(t + C) \\
y(-1) &= \tan(-1 + C) = 8 \\
-1 + C &= \tan^{-1}(8) \\
C &= \tan^{-1}(8) + 1 \\
y &= \tan(t + \tan^{-1}(8) + 1).
\end{align*}
$$

We can graph the solution below:

```desmos

y = \tan(x + \tan^{-1}(8) + 1)

```

The domain for this function is $t \in \left(-\frac{\pi}{2}-1.45, \frac{\pi}{2}-1.45\right)$

</blockquote>

<blockquote class="problem">

State where in the $t-y$ plane the hypothesis of the existence and uniqueness theorem is satisfied for the I.V.P.:

$$
(3y - y^2)y' + (1+t^2) = 0
$$

</blockquote>

<blockquote class="proof">

First, we observe that the ODE is **non-linear**. We rewrite the ODE in the form $y' = f(t, y)$, and find $\frac{\partial f}{\partial y}$:

$$
y' = -\frac{1+t^2}{3y - y^2}, \quad \frac{\partial f}{\partial y} = \frac{\left(1+t^2\right)\left(3-2y\right)}{\left(3y-y^2\right)^2}.
$$

First we analyze $f(t, y) = -\frac{1+t^2}{3y - y^2}$:

- Continuous everywhere in $t$: $t \in (\infty, \infty)$.
- Not continuous at $y=0, 3$: $y \in (-\infty, 0) \cup (0, 3) \cup (3, \infty)$.

Next, we analyze $\frac{\partial f}{\partial y} = \frac{\left(1+t^2\right)\left(3-2y\right)}{\left(3y-y^2\right)^2}$:

- Continuous everywhere in $t$: $t \in (\infty, \infty)$.
- Not continuous at $y=0, 3$: $y \in (-\infty, 0) \cup (0, 3) \cup (3, \infty)$.

We take the intersection of the domains of continuity of $f(t, y)$ and $\frac{\partial f}{\partial y}$, and find the domain of continuity in the $t-y$ plane:

$$
t \in (\infty, \infty), y \in (-\infty, 0) \cup (0, 3) \cup (3, \infty).
$$

Therefore, we have 3 regions in the $t-y$ plane where the hypothesis of the existence and uniqueness theorem is satisfied.

</blockquote>

</details>

### Exact Differential Equations

<span class="subtitle">

Section 2.6 in BOYCE, DIPRIMA.

</span>

<blockquote class="theorem">

  Let the functions $M, N, M_y, N_x$, where subscripts denote partial derivatives, be continuous in the rectangular region $R: \alpha < x < \beta, \gamma < y < \delta$. Then:

  $$
  \begin{equation} \label{eq:exact-ode-1}
  M(x, y) + N(x, y)y' = 0
  \end{equation}
  $$

  is an **exact differential equation** if and only if:

  $$
  \begin{equation} \label{eq:exact-ode-2}
  M_y(x,y) = N_x(x,y)
  \end{equation}
  $$

  at each point of $R$. That is, there exists a function $\psi(x, y)$ such that:

  $$
  \begin{equation} \label{eq:exact-ode-3}
  \psi_x(x, y) = M(x, y) \quad \text{and} \quad \psi_y(x, y) = N(x, y),
  \end{equation}
  $$

  if and only if $M$ and $N$ satisfy $\eqref{eq:exact-ode-2}$.

</blockquote>

To solve an ODE using exact differential equations, we follow the following steps:

1. Identify $M(x, y)$ and $N(x, y)$.
2. Verify if the ODE is exact by computing $M_y$ and $N_x$.
3. Solve for $\psi(x, y)$ by integrating $\psi_x$ and $\psi_y$.
4. Conclude that the solution to the ODE is $\psi(x, y) = c$, where $c$ is the constant of integration.

For example, suppose we have the following ODE:

$$
\begin{equation} \label{eq:exact-ode-example}
(y\cos x + 2xe^y) + (\sin x + x^2 e^y - 1)y' = 0.
\end{equation}
$$

We can see that $\eqref{eq:exact-ode-example}$ is already in the form of $\eqref{eq:exact-ode-1}$. And we identify:

$$
\begin{align}
M(x, y) = y\cos x + 2xe^y, \quad N(x, y) = \sin x + x^2 e^y - 1.
\end{align}
$$

We then find $M_y$ and $N_x$ to verify if $\eqref{eq:exact-ode-example}$ is an exact differential equation:

$$
\begin{align}
M_y(x, y) &= \frac{\partial M}{\partial y} = \cos x + 2xe^y, \\
N_x(x, y) &= \frac{\partial N}{\partial x} = \cos x + 2x e^y.
\end{align}
$$

Therefore, we have shown that $\eqref{eq:exact-ode-example}$ is an exact differential equation. Next, we solve for $\psi(x, y)$:

$$
\begin{align}
\psi_x(x, y) &= \frac{\partial \psi}{\partial x} = y\cos x + 2xe^y, \\
\psi_y(x, y) &= \frac{\partial \psi}{\partial y} = \sin x + x^2 e^y - 1. \label{eq:exact-ode-psi-original}
\end{align}
$$

To solve for $\psi(x, y)$, we first integrate $\psi_x(x, y)$ with respect to $x$:

$$
\begin{align}
\psi(x, y) &= \int y\cos x + 2xe^y \, dx = y\sin x + x^2 e^y + h(y). \label{eq:exact-ode-psi}
\end{align}
$$

Next, we compute $\psi_y$ from $\eqref{eq:exact-ode-psi}$ and setting $\psi_y = N$:

$$
\begin{align}
\psi_y(x, y) = \underbrace{y\cos x + 2xe^y + h'(y)}_{\text{computed from }\eqref{eq:exact-ode-psi}} = \underbrace{\sin x + x^2 e^y - 1}_{\eqref{eq:exact-ode-psi-original}}.
\end{align}
$$

We then solve for $h'(y) = -1$ and find $h(y) = -y$. The constant of integration can be omitted since any solution of the preceding differential equation is satisfactory. Therefore, substituting $h(y) = -y$ back into $\eqref{eq:exact-ode-psi}$, we find the solution to the exact differential equation:

$$
\begin{align}
\psi(x, y) &= y\sin x + x^2 e^y - y.
\end{align}
$$

Finally, we can write the solution to the exact differential equation as:

$$
\begin{align}
y\sin x + x^2 e^y - y &= c,
\end{align}
$$

where $c$ is the constant of integration.

<details><summary>Unsolvable Exact Differential Equations</summary>

<blockquote class="problem">

Solve the differential equation:

$$
(3xy + y^2) + (x^2 + xy)y' = 0.
$$

</blockquote>

<blockquote class="proof" id="unsolvable_exact">

We have $M(x, y) = 3xy + y^2$ and $N(x, y) = x^2 + xy$. We then find $M_y$ and $N_x$:

$$
\begin{align}
M_y(x, y) &= 3x + 2y, \\
N_x(x, y) &= 2x + y.
\end{align}
$$

Since $M_y \neq N_x$, the ODE is not exact. Therefore, we cannot solve the ODE using the method of exact differential equations.

</blockquote>

</details>

#### Integrating Factors in Exact Differential Equations

It is sometimes possible to convert a differential equation that is not exact into an exact differential equation by multiplying by an **integrating factor**. We aim to find an integrating factor $\mu(x, y)$ such that:

$$
\begin{equation} \label{eq:exact-integrating-factor}
\mu(x, y)M(x, y) + \mu(x, y)N(x, y)y' = 0
\end{equation}
$$

is an exact ODE, where $(\mu M)_y = (\mu N)_x$. Since $M$ and $N$ are given functions, the integrating factor $\mu$ must satisfy the first-order partial differential equation:

$$
\begin{equation} \label{eq:exact-integrating-factor-pde}
M\mu_y - N\mu_x + (M_y -N_x)\mu = 0.
\end{equation}
$$

If a function $\mu$ satisfying $\eqref{eq:exact-integrating-factor-pde}$ can be found, then $\eqref{eq:exact-integrating-factor}$ will be exact. If we assume $\mu$ is a function of $x$ only, then $\eqref{eq:exact-integrating-factor-pde}$ simplifies to:

$$
\begin{equation} \label{eq:exact-integrating-factor-pde-x}
\frac{d\mu}{dx} = \frac{M_y - N_x}{N}\mu,
\end{equation}
$$

where $\mu(x)$ can be solved by solving the ODE $\eqref{eq:exact-integrating-factor-pde-x}$ using either separation of variables or integrating factors.

Similarly, we can also assume $\mu$ is a function of $y$ only, then $\eqref{eq:exact-integrating-factor-pde}$ simplifies to:

$$
\begin{equation} \label{eq:exact-integrating-factor-pde-y}
\frac{d\mu}{dy} = \frac{N_x - M_y}{M}\mu,
\end{equation}
$$

where $\mu(y)$ can be solved by solving the ODE $\eqref{eq:exact-integrating-factor-pde-y}$ using either separation of variables or integrating factors.

Suppose we have the following ODE:

$$
\begin{equation} \label{eq:exact-integrating-factor-example}
(3xy + y^2) + (x^2 + xy)y' = 0.
\end{equation}
$$

We have already [shown](#unsolvable_exact) that $\eqref{eq:exact-integrating-factor-example}$ is not exact. We can determine whether it has an integrating factor that depends on $x$ only. We compute $(M_y - N_x) / N$ following $\eqref{eq:exact-integrating-factor-pde-x}$:

$$
\begin{align}
\frac{M_y(x, y) - N_x(x, y)}{N(x, y)} &= \frac{3x + 2y - \left(2x + y \right)}{x^2 +xy} = \frac{1}{x}.
\end{align}
$$

Thus there is an integrating factor $\mu(x)$ that depends on $x$ only. We can solve for $\mu(x)$ by solving the ODE $\eqref{eq:exact-integrating-factor-pde-x}$:

$$
\begin{align}
\frac{d\mu}{dx} &= \frac{1}{x}\mu \implies \mu(x) = x.
\end{align}
$$

We can now multiple both sides with $\mu(x) = x$ in $\eqref{eq:exact-integrating-factor-example}$:

$$
\begin{align}
3x^2y + xy^2 + (x^3 + x^2y) y' = 0 \label{eq:exact-integrating-factor-example-2}.
\end{align}
$$

Now, $\eqref{eq:exact-integrating-factor-example-2}$ is exact, because:

$$
\begin{align}
M(x, y) &= 3x^2y + xy^2, \implies M_y = 3x^2 + 2xy, \\
N(x, y) &= x^3 + x^2y, \implies N_x = 3x^2 + 2xy.
\end{align}
$$

We can now solve for $\psi(x, y)$ by integrating $\psi_x$ and $\psi_y$:

$$
\begin{align}
\psi_x(x, y) &= 3x^2y + xy^2, \\
\psi(x, y) &= \int 3x^2y + xy^2 \, dx = x^3y + \frac{1}{2}x^2y^2 + h(y) \\
\psi_y(x, y) &= \frac{d}{dy} \left(x^3y + \frac{1}{2}x^2y^2 + h(y) \right) = x^3 + x^2y \\
&= x^3 + 2x^2y + h'(y) = x^3 + x^2y, \implies h'(y) = 0 \\
\psi(x, y) &= x^3y + \frac{1}{2}x^2y^2 \implies x^3y + \frac{1}{2}x^2y^2 = c.
\end{align}
$$

<details><summary>

Choosing $\frac{d\mu}{dx}$ or $\frac{d\mu}{dy}$ to find the integrating factor

</summary>

<blockquote class="problem">

Find an integrating factor and solve the ODE:

$$
1 + \left(\frac{x}{y} - \sin y \right)y' = 0.
$$

</blockquote>

We check if the ODE is exact by computing $M_y$ and $N_x$:

$$
\begin{align*}
M(x, y) &= 1, \quad M_y = 0, \\
N(x, y) &= \frac{x}{y} - \sin y, \quad N_x = \frac{1}{y}.
\end{align*}
$$

Since $M_y \neq N_x$, the ODE is not exact. We find an integrating factor $\mu(x)$. We first compute $\frac{d\mu}{dx}$:

$$
\frac{d\mu}{dx} = \frac{M_y - N_x}{N}\mu = \frac{0 - \frac{1}{y}}{\frac{x}{y} - \sin y}\mu.
$$

If we solve for $\mu(x)$, we find that it also depends on $y$, since $y$ is in the denominator. We then check for $\frac{d\mu}{dy}$:

$$
\frac{d\mu}{dy} = \frac{N_x - M_y}{M}\mu = \frac{\frac{1}{y} - 0}{1}\mu = \frac{1}{y}\mu.
$$

We can confirm that $\mu(y)$ is a function of $y$ only. After solving with separation of variables, we find that $\mu(y) = y$. We can then multiply the ODE by $\mu(y) = y$:

$$
y \cdot 1 + y\left(\frac{x}{y} - \sin y \right)y' = 0.
$$

We now have an exact equation, since we have:

$$
\begin{align*}
M(x, y) &= y, \quad M_y = 1, \\
N(x, y) &= x - y\sin y, \quad N_x = 1.
\end{align*}
$$

We next solve for $\psi(x, y)$:

$$
\begin{align*}
\psi(x, y) &= \int \psi_x(x, y) \, dx = \int y \, dx = xy + h(y) \\
\psi_y(x, y) &= \frac{d}{dy} \left(xy + h(y) \right) = x - y\sin y \\
\psi_y(x, y) &= x + h'(y) = x - y\sin y \implies h'(y) = -y\sin y \implies h(y) = y\cos \left(y\right)-\sin \left(y\right) \\
\psi(x, y) &= xy + y\cos \left(y\right)-\sin \left(y\right).
\end{align*}
$$

Therefore, the solution to the ODE is:

$$
y + y\cos \left(y\right)-\sin \left(y\right) = c,
$$

where $c$ is the constant of integration.

</details>

### Numerical Approximations: Euler’s Method

<span class="subtitle">

Section 2.7 in BOYCE, DIPRIMA.

</span>

Given an ODE in the form $y' = f(t, y)$, suppose that $f(t,y)$ is very complicated and we cannot solve it analytically. We can use **numerical methods** to approximate the solution to the ODE. One such method is **Euler's method**.

<blockquote class="theorem">

Given an initial condition $y(t_0) = y_0$, we can approximate the solution to the ODE $y' = f(t, y)$ using Euler's method:

$$
\begin{equation} \label{eq:euler-method}
y(t_{k+1}) \approx y(t_k) + f(t_k, y(t_k)) (t_{k+1} - t_k).
\end{equation}
$$

</blockquote>

Suppose we use a fixed step size $h = t_{k+1} - t_k$, we can rewrite $\eqref{eq:euler-method}$ as:

$$
\begin{equation} \label{eq:euler-method-fixed}
y_{k+1} \approx y_k + h f(t_k, y_k).
\end{equation}
$$

<blockquote class="note">

We can use the notation $y_k$ to denote the approximation of $y(t_k)$.

</blockquote>

Suppose we have:

$$
\begin{equation} \label{eq:euler-method-example}
\frac{du}{dt} = -k(u - T(t)), \quad T(t) = T_0 + T_1\cos(\omega t), \quad u(0) = 0,
\end{equation}
$$

where $k=0.1, \omega = 3, T_0 = 10, T_1 = -20$. We can first find the analytical solution.

<details><summary>Analytical Solution</summary>

We first write $\eqref{eq:euler-method-example}$ in standard format:

$$
    \frac{du}{dt} = -k (u - T(t)) \implies \frac{du}{dt} = -ku + kT(t) \implies \frac{du}{dt} + ku = kT(t).
$$

We solve this ODE by the method of integrating factors:

$$
\begin{align*}
    \frac{du}{dt} + ku             & = kT(t)                                                                                                                                                                                                                                           \\
    \mu(t)                         & = e^{\int k dt} = e^{kt}                                                                                                                                                                                                                         \\
    e^{kt}\frac{du}{dt} + ke^{kt}u & = kT(t)e^{kt} \implies \frac{d}{dt}\left(e^{kt}u\right) = kT(t)e^{kt}                                                                                                                                                                              \\
    e^{kt}u                        & = k\int T(t)e^{kt} \, dt                                             =k\int \left(T_0 + T_1 \cos(\omega t)\right)e^{kt} \, dt                                                                                                                      \\
    e^{kt}u                        & = k\int T_0e^{kt} + T_1e^{kt} \cos(\omega t) \, dt = k\left(T_0\int e^{kt} \, dt + T_1\int e^{kt} \cos(\omega t) \, dt                                                                                                                                   \right)\\
    e^{kt}u                        & = k\left[\frac{T_0}{k}e^{kt} + T_1\left(e^{kt} \frac{1}{\omega}\sin(\omega t) - \int \frac{1}{\omega}\sin(\omega t) ke^{kt} \, dt \right) \right]                                        \\
    e^{kt}u                        & = k\left[\frac{T_0}{k}e^{kt} + T_1\left(e^{kt} \frac{1}{\omega}\sin(\omega t) - \frac{k}{\omega} \int \sin(\omega t)e^{kt} \, dt \right)   \right]                                                                               \\
    e^{kt}u                        & = k\left[\frac{T_0}{k}e^{kt} + T_1\left(e^{kt} \frac{1}{\omega}\sin(\omega t) - \frac{k}{\omega} \left( -e^{kt}\frac{1}{\omega}\cos(\omega t) - \int -ke^{kt}\frac{1}{\omega}\cos(\omega t)    \, dt\right) \right)\right]      \\
    e^{kt}u                        & = k\left[\frac{T_0}{k}e^{kt} + T_1\left(e^{kt} \frac{1}{\omega}\sin(\omega t) - \frac{k}{\omega} \left( -e^{kt}\frac{1}{\omega}\cos(\omega t) - \left(-\frac{k}{\omega}\int e^{kt}\cos(\omega t)    \, dt\right)\right) \right)\right].
\end{align*}
$$

To continue solve for the integral, we isolate $\int e^{kt}\cos(\omega t)\, dt$:

$$
\begin{align*}
    \int e^{kt}\cos(\omega t)    \, dt                                       & = e^{kt} \frac{1}{\omega}\sin(\omega t) - \frac{k}{\omega} \left( -e^{kt}\frac{1}{\omega}\cos(\omega t) - \left(-\frac{k}{\omega}\int e^{kt}\cos(\omega t)    \, dt\right)\right) \\
    \int e^{kt}\cos(\omega t)    \, dt                                       & = e^{kt} \frac{1}{\omega}\sin(\omega t) - \frac{k}{\omega} \left( -e^{kt}\frac{1}{\omega}\cos(\omega t) +\frac{k}{\omega}\int e^{kt}\cos(\omega t)    \, dt\right)                \\
    \int e^{kt}\cos(\omega t)    \, dt                                       & =e^{kt} \frac{1}{\omega}\sin(\omega t) + \frac{k}{\omega^2} e^{kt}\cos(\omega t) -\frac{k^2}{\omega^2}\int e^{kt}\cos(\omega t)    \, dt                                          \\
    \int e^{kt}\cos(\omega t)\, dt\left( 1 + \frac{k^2}{\omega^2}\right)     & =e^{kt} \frac{1}{\omega}\sin(\omega t) + \frac{k}{\omega^2} e^{kt}\cos(\omega t)                                                                                                  \\
    \int e^{kt}\cos(\omega t)\, dt\left(\frac{\omega^2+k^2}{\omega^2}\right) & =e^{kt} \frac{1}{\omega}\sin(\omega t) + \frac{k}{\omega^2} e^{kt}\cos(\omega t)                                                                                                  \\
    \int e^{kt}\cos(\omega t)\, dt                                           & = \left(e^{kt} \frac{1}{\omega}\sin(\omega t) + \frac{k}{\omega^2} e^{kt}\cos(\omega t)\right) \left(\frac{\omega^2}{\omega^2+k^2}\right)                                         \\
    \int e^{kt}\cos(\omega t)\, dt                                           & = \frac{e^{kt}\omega\sin(\omega t)}{\omega^2+k^2}+ \frac{ke^{kt}\cos(\omega t)}{\omega^2+k^2} + C
\end{align*}
$$

Therefore, plugging in this result, we get:

$$
\begin{align*}
    e^{kt}u   & = k\left(\frac{T_0}{k}e^{kt} + T_1\left(\frac{e^{kt}\omega\sin(\omega t)}{\omega^2+k^2}+ \frac{ke^{kt}\cos(\omega t)}{\omega^2+k^2} \right)\right) + C \\
    e^{kt}u &= T_0e^{kt} + \frac{T_1k\omega e^{kt}\sin(\omega t) + T_1k^2 e^{kt}\cos(\omega t)}{\omega^2 + k^2} + C\\
    u &= Ce^{-kt} + T_0 + \frac{kT_{1}\left(k\cos\left(\omega t\right)+\omega\sin\left(\omega t\right)\right)}{k^{2}+\omega^{2}}.
\end{align*}
$$

Solving for the initial condition $u(0) = 0$, we find $C = -\frac{89.9}{9.01} \approx -9.98$, which gives us the solution:

$$
\begin{equation} \label{eq:analytical-solution-example}
u = -\frac{89.9}{9.01}e^{-kt} + T_0 + \frac{kT_{1}\left(k\cos\left(\omega t\right)+\omega\sin\left(\omega t\right)\right)}{k^{2}+\omega^{2}}.
\end{equation}
$$

```desmos

-\frac{89.9}{9.01}e^{-kx}+T_{0}+\frac{kT_{1}\left(k\cos\left(\omega x\right)+\omega\sin\left(\omega x\right)\right)}{k^{2}+\omega^{2}}
k=0.1
\omega=3
T_{0}=10
T_{1}=-20

```

</details>

We can then use Euler's method to approximate the solution to the ODE $\eqref{eq:euler-method-example}$. We do this by computing the values of $u$ at each time step $t_k$ with a fixed step size $h = 0.01$ until $t = 20$.

```execute-python
import numpy as np
import matplotlib.pyplot as plt

# Constants
k = 0.1
omega = 3
T0 = 10
T1 = -20
h = 0.1
t_final = 20  # Last t value to be approximated

# Initial condition
u = 0

# Time steps until t = t_final
t = np.arange(0, t_final, h)

# List to store u values
u_values = [u]

# Euler's method loop
for t_k in t[1:]:
    u = u + h * (-k * (u - (T0 + T1 * np.cos(omega * t_k))))
    u_values.append(u)

# Ground truth function
def ground_truth(t, k, omega, T0, T1):
    term1 = -(89.9 / 9.01) * np.exp(-k * t)
    term2 = T0
    term3 = (k * T1 * (k * np.cos(omega * t) + omega * np.sin(omega * t))) / (k**2 + omega**2)
    return term1 + term2 + term3

# Calculate ground truth values
t_fine = np.linspace(0, t_final, 1000)
ground_truth_values = ground_truth(t_fine, k, omega, T0, T1)

# Plotting the results
plt.figure(figsize=(8, 6))
plt.plot(t, u_values, label='Approximate solution (Euler)', color='b', marker='o', markersize=3, linestyle='-')
plt.plot(t_fine, ground_truth_values, label='Ground truth', color='r', linestyle='--')
plt.xlabel('Time (t)')
plt.ylabel('u(t)')
plt.title('Solution of the ODE using Euler\'s Method and Ground Truth')
plt.legend()
plt.grid(True)

get_image(plt)
```

<details><summary>Euler's Method Problems</summary>

<blockquote class="problem">

Use Euler's method to approximate $y(2)$ given:

$$
y' = t - y, \quad y(1) = 0,
$$

and suppose we have $t_{k+1} = t_k + 0.25$, $h = 0.25$.

</blockquote>

Given that we have $h = 0.25$, we have $T = [t_0, t_1, t_2, t_3, t_4] = [1, 1.25, 1.5, 1.75, 2]$. We have $f(t, y) = t - y$, and we can use $\eqref{eq:euler-method-fixed}$ to approximate $y(2)$:

$$
\begin{align*}
\text{Step 1: } & y_1 = y_0 + h f(t_0, y_0) = 0 + 0.25(1 - 0) = 0.25, \\
\text{Step 2: } & y_2 = y_1 + h f(t_1, y_1) = 0.25 + 0.25(1.25 - 0.25) = 0.5, \\
\text{Step 3: } & y_3 = y_2 + h f(t_2, y_2) = 0.5 + 0.25(1.5 - 0.5) = 0.75, \\
\text{Step 4: } & y_4 = y_3 + h f(t_3, y_3) = 0.75 + 0.25(1.75 - 0.75) = 1, \\
\end{align*}
$$

Therefore, we have $y_4 = y(t_4) = y(2) \approx 1$.

Since $f(t, y) = t - y$ is a linear ODE, we can solve it analytically to find the exact solution:

$$
\begin{align*}
y' &= t - y \\
y' + y &= t \\
\mu(t) &= e^{\int 1 \, dt} = e^t \\
e^ty' + e^ty &= e^tt \\
\frac{d}{dt}\left(e^ty\right) &= e^tt \\
\int \frac{d}{dt}\left(e^ty\right) \, dt &= \int e^tt \, dt \\
e^ty &= e^t(t - 1) + C \\
y &= t - 1 + Ce^{-t} \\
y(1) &= 0 = 1 - 1 + C \implies C = 0 \\
y &= t - 1.
\end{align*}
$$

Therefore, we have $y(2) = 2 - 1 = 1$.

</details>
