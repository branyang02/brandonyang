# **Ordinary Differential Equations**

<span class="subtitle">
Fall 2024 | Author: Brandon Yang
</span>

---

## Background

<details><summary>Review for Calculus</summary>

### Differentiation

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

</details>

<details><summary>Integration</summary>

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

<blockquote class="problem">

Suppose we have the following problem:

Verify $y = x$ satisfies the ODE $y'=1$.

</blockquote>

<blockquote class="proof">

We solve this by taking the derivative of $y$:

$$

y' = 1.

$$

Since $y' = 1$, we have verified that $y = x$ satisfies the ODE.

</blockquote>

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
2. **Integrating Factors**
3. **Exact ODEs**

### Separable ODEs

<span class="subtitle">

Section 2.2 in BOYCE, DIPRIMA.

</span>

We solved a [simple ODE](#simple-ode) initially by using direct integration, but we can also solve ODEs by separating variables. For example, let's solve the same ODE:

$$
\frac{dy}{dx} = y' = y.
$$

We first separate variables:

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
\ln|y| &= x + C.
\end{align}
$$

The general solution should be in the form of $y = f(x)$, so we solve for $y$:

$$
\begin{align}
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

### Integrating Factors

<span class="subtitle">

Section 2.1 in BOYCE, DIPRIMA.

</span>

We can rewrite a first-order ODE in the form:

$$
\begin{equation} \label{eq:integrating-factor}
P(t)\frac{dy}{dt} + Q(t)y = G(t),
\end{equation}
$$

where $P(t)$, $Q(t)$, and $G(t)$ are given arbitrary functions of $t$. We can first look at an example problem in this form:

$$
\begin{equation} \label{eq:example}
(4 + t^2) \frac{dy}{dt} + 2ty = 4t.
\end{equation}
$$

We can notice that the left side of $\eqref{eq:example}$ is in the form of $\eqref{eq:integrating-factor}$, where $P(t) = 4 + t^2$, $Q(t) = 2t$, and $G(t) = 4t$. Moreover, we observe that the left side of $\eqref{eq:example}$ is the derivative of a product following the product rule in $\eqref{eq:product_rule}$:

$$
\begin{align}
(4 + t^2) \frac{dy}{dt} + 2ty = \frac{d}{dt} \left( (4 + t^2)y \right).
\end{align}
$$

We can then rewrite $\eqref{eq:example}$ as:

$$
\begin{align}
\frac{d}{dt} \left( (4 + t^2)y \right) &= 4t.
\end{align}
$$

We can then integrate both sides with respect to $t$:

$$
\begin{align}
\int \frac{d}{dt} \left( (4 + t^2)y \right) \, dt &= \int 4t \, dt \\
(4 + t^2)y &= 2t^2 + C.
\end{align}
$$

Finally, we solve for $y$:

$$
\begin{align}
y &= \frac{2t^2 + C}{4 + t^2}.
\end{align}
$$

However, in most cases, the left side of $\eqref{eq:integrating-factor}$ is not the derivative of a product. We can then multiply both sides of $\eqref{eq:integrating-factor}$ by an **integrating factor** $\mu(t)$:

$$
\begin{align}
\mu(t)P(t)\frac{dy}{dt} + \mu(t)Q(t)y &= \mu(t)G(t). \label{eq:mu-factor}
\end{align}
$$

For any differentiable function $\mu(t)$, we can use the product rule in $\eqref{eq:product_rule}$:

$$
\begin{align}
\frac{d}{dt} \left( \mu(t)y \right) &= \mu(t)\frac{dy}{dt} + \frac{d\mu(t)}{dt}y. \label{eq:product_rule_2}
\end{align}
$$

Our goal is to choose $\mu(t)$ such that $\eqref{eq:product_rule_2}$ is equal to the left side of $\eqref{eq:mu-factor}$:

$$
\begin{align}
\mu(t)\frac{dy}{dt} + \frac{d\mu(t)}{dt}y = \mu(t)P(t)\frac{dy}{dt} + \mu(t)Q(t)y. \label{eq:mu-factor-2}
\end{align}
$$

Then, we simply solve for $\mu(t)$, and plug it back into $\eqref{eq:mu-factor}$ to solve for $y$.

Let's consider the following first-order ODE:

$$
\begin{equation} \label{eq:ode-example}
\frac{dy}{dt} + \frac{1}{2}y = \frac{1}{2}e^{t/3}
\end{equation}
$$

Following $\eqref{eq:mu-factor}$, we multiply both sides by $\mu(t)$:

$$
\begin{align}
\mu(t) \frac{dy}{dt} + \frac{1}{2}\mu(t)y &= \frac{1}{2}\mu(t)e^{t/3}. \label{eq:mu-factor-example}
\end{align}
$$

Following $\eqref{eq:mu-factor-2}$, we can solve for $\mu(t)$:

$$
\begin{align}
\mu(t)\frac{dy}{dt} + \frac{d\mu(t)}{dt}y &= \mu(t) \frac{dy}{dt} + \frac{1}{2}\mu(t)y \\
\frac{d\mu(t)}{dt} &= \frac{1}{2}\mu(t) \\
\end{align}
$$

This is a first-order linear ODE, and we can solve it by separating variables:

$$
\begin{align}
\frac{1}{\mu(t)} d \mu(t) &= \frac{1}{2} dt \\
\end{align}
$$

We then integrate both sides:

$$
\begin{align}
\int \frac{1}{\mu(t)} d \mu(t) &= \int \frac{1}{2} dt \\
\ln|\mu(t)| &= \frac{1}{2}t + C \\
\mu(t) &= e^{\frac{1}{2}t + C} \\
\mu(t) &= e^{\frac{1}{2}t}e^C \\
\mu(t) &= Ce^{\frac{1}{2}t}.
\end{align}
$$

Therefore, $Ce^{\frac{1}{2}t}$ is an integrating factor for $\eqref{eq:ode-example}$, but since we do not need the most general integrating factor, we will choose $C$ to be $1$ and use $\mu(t) = e^{\frac{1}{2}t}$.

Now we return to $\eqref{eq:mu-factor-example}$ with $\mu(t) = e^{\frac{1}{2}t}$:

$$
\begin{align}
e^{\frac{1}{2}t} \frac{dy}{dt} + \frac{1}{2}e^{\frac{1}{2}t}y &= \frac{1}{2}e^{\frac{1}{2}t}e^{t/3} \label{eq:mu-factor-example-2}
\end{align}
$$

We rewrite the left side as the derivative of a product:

$$
\begin{align}
e^{\frac{1}{2}t} \frac{dy}{dt} + \frac{1}{2}e^{\frac{1}{2}t}y = \frac{d}{dt} \left( e^{\frac{1}{2}t}y \right)
\end{align}
$$

We then rewrite $\eqref{eq:mu-factor-example-2}$ as:

$$
\begin{align}
\frac{d}{dt} \left( e^{\frac{1}{2}t}y \right) &= \frac{1}{2}e^{\frac{1}{2}t}e^{t/3} = \frac{1}{2}e^{\frac{5}{6}t}
\end{align}
$$

Integrating both sides:

$$
\begin{align}
\int \frac{d}{dt} \left( e^{\frac{1}{2}t}y \right) \, dt &= \int \frac{1}{2}e^{\frac{5}{6}t} \, dt \\
e^{\frac{1}{2}t}y &= \frac{3}{5}e^{\frac{5}{6}t} + C \\
y &= \frac{3}{5}e^{\frac{1}{3}t} + Ce^{-\frac{1}{2}t}
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

We write the ODE in the form of $\eqref{eq:integrating-factor}$, and add the integrating factor $\mu(t)$:

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
\begin{equation} \label{eq:ivp-2}
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

</details>
