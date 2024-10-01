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

Additionally, we can now extend the method of integrating factors to equations of the form:

$$
\begin{equation} \label{eq:shortcut-1}
\frac{dy}{dt} + p(t)y = g(t),
\end{equation}
$$

where $p(t)$ and $g(t)$ are continuous functions of $t$. We can take a shortcut and find the integrating factor $\mu(t)$ by:

$$
\begin{equation} \label{eq:shortcut-2}
\mu(t) = e^{\int p(t) \, dt}.
\end{equation}
$$

Next, we can simply multiply both sides of $\eqref{eq:shortcut-1}$ by $\mu(t)$ and solve for $y$.

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

We first rewrite the ODE in the standard form of $\eqref{eq:shortcut-1}$:

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

We first rewrite the equation in standard format $\eqref{eq:shortcut-1}$:

$$
\begin{align}
\frac{dy}{dt} + \frac{y}{t\ln(t)} &= \frac{te^t}{t\ln(t)} \\
\frac{dy}{dt} + \frac{y}{t\ln(t)} &= \frac{e^t}{\ln(t)}.
\end{align}
$$

We find that $p(t) = \frac{1}{t\ln(t)}$ and we solve for the integrating factor $\mu$(t) using the formula $\eqref{eq:shortcut-2}$:

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

We first rewrite the equation in the form $\eqref{eq:shortcut-1}$:

$$
\begin{align}
x^4\frac{dy}{dx}  + 4x^3y  &= \sin^3(x) \\
\frac{dy}{dx}  + \frac{4x^3y}{x^4}  &= \frac{\sin^3(x)}{x^4} \\
\frac{dy}{dx}  + \frac{4y}{x}  &= \frac{\sin^3(x)}{x^4} \label{eq:example-fact-1}.
\end{align}
$$

We see find that $p(t) = \frac{4}{x}$, and we solve for the integrating factor $\mu$ using the formula $\eqref{eq:shortcut-2}$:

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

### Non-Linear ODEs

Suppose we have a non-linear first-order ODE:

$$
\begin{equation} \label{eq:non-linear}
y' + \sin(x)y = y^4.
\end{equation}
$$

We can see from $\eqref{eq:linear-ode}$ that this is a non-linear ODE because of the $y^4$ term. The idea is to rewrite the ODE into a linear ODE. We start by dividing both sides by $y^4$:

$$
\begin{align}
\frac{y'}{y^4} + \frac{\sin(x)}{y^3} &= 1 \label{eq:non-linear-2}.
\end{align}
$$

Next, we introduce a new variable $u$, and we want to rewrite $\eqref{eq:non-linear}$ in the form of $u' + p(x) u = g(x)$. We can see from $\eqref{eq:non-linear-2}$ that $u = \frac{1}{y^3}$, and we can solve for $u'$ and $y'$:

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

## Applications to ODEs

<span class="subtitle">

Section 2.3 in BOYCE, DIPRIMA.

</span>

### Interest Problems

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

### Newton's Law of Cooling

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

### Population Problems

<span class="subtitle">

Section 2.3 in BOYCE, DIPRIMA.

</span>

Logistic growth is a model of population growth where the rate of growth is proportional to the population size and the difference between the population size and the carrying capacity.

Suppose $P(t)$ is the population size at time $t$, we can model the logistic growth as:

$$
\begin{equation}
\frac{dP}{dt} = rP\left(1 - \frac{P}{k}\right), \quad r, k > 0.
\end{equation}
$$

where $r$ is the **growth rate** and $k$ is the **carrying capacity**.

We can find the critical points of the ODE by setting $\frac{dP}{dt} = 0$, where we find that $P = 0$ and $P = k$. These are also known as the **equilibrium points**. We can plot $\frac{dP}{dt}$ below:

```desmos

rx\left(1 - \frac{x}{k}\right)

```

Suppose we define the ODE as a function:

$$
\begin{equation}
f(P) = rP\left(1 - \frac{P}{k}\right) \label{eq:logistic-ode},
\end{equation}
$$

we can see that $f(P) = 0$ at $P = 0$ and $P = k$. We can then use the first derivative test to determine the stability of the equilibrium points. We can also see from the graph that $\frac{dP}{dt}$ is positive when $0 < P < k$ and negative when $P > k$, meaning that the population grows when $0 < P < k$ and decreases when $P > k$.

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

Therefore, we can plot the graph of $P(t)$ below, as well as the equilibrium points at $0$ and $k$. We can adjust $P_0$ to see how the population changes with different initial conditions.

```desmos

\frac{P_{0}k}{P_{0}+\left(k-P_{0}\right)e^{-rx}}
y = 0
y = k

```

We can see that all initial conditions will converge to the carrying capacity $k$. We can also take the limit as $t \to \infty$:

$$
\begin{align}
\lim_{t \to \infty} P(t) &= \lim_{t \to \infty} \frac{P_{0}k}{P_{0}+\left(k-P_{0}\right)e^{-rt}} = \frac{P_{0}k}{P_{0}+\left(k-P_{0}\right)0} = k.
\end{align}
$$

The solution $P(t) = k$ is known as the **asymptotically stable solution** of the ODE. On the other hand, the solution $P(t) = 0$ is known as the **unstable equilibrium solution**.

<blockquote class="definition">

Given an ODE that models population in the form:

$$
\frac{dy}{dt} = f(y),
$$

where $f(y)$ is a continuous function of $y$, we say that $y = y_0$ is an **equilibrium solution** if $f(y_0) = 0$. We say that $y = y_0$ is an **asymptotically stable solution** if $f'(y_0) < 0$ and $y = y_0$ is an **unstable equilibrium solution** if $f'(y_0) > 0$.

</blockquote>

## Linear and Non-Linear ODEs Theory

### Existence and Uniqueness of 1st Order Non-Linear ODEs

Consider the I.V.P.:

$$
\begin{cases}
y' = f(t, y) \\
y(t_0) = y_0
\end{cases}
$$

where $f(t, y)$ is a continuous function of $t$ and $y$. We can see that the solution to the I.V.P. is a function $y = \phi(t)$ that satisfies the ODE and the initial condition.

<blockquote class="theorem">

If $f(t, y)$ is continuous in a rectangle $R = \{(t, y) | |t - t_0| \leq a, |y - y_0| \leq b\}$ and $f(t, y)$ is Lipschitz continuous in $y$ in $R$, then the I.V.P. has a unique solution in some interval $|t - t_0| \leq h$.

</blockquote>

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

<details><summary>Existence and Uniqueness Problems</summary>

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

## Exact Differential Equations

<span class="subtitle">

Section 2.6 in BOYCE, DIPRIMA.

</span>

Given ODE: $y' = f(t, y)$, another way to solve the ODE is to rewrite the ODE in the form:

$$
\begin{equation} \label{eq:exact-ode-form}
\frac{d}{dt} \psi(t, y) = 0,
\end{equation}
$$

where $\psi(t, y)$ is a function of $t$ and $y$.

We start from an arbitrary ODE in the following form:

$$
\begin{equation} \label{eq:exact-ode}
M(t, y) + N(t, y)y' = 0,
\end{equation}
$$

where $M(t, y)$ and $N(t, y)$ are continuous functions of $t$ and $y$. We can rewrite the ODE in the form $\eqref{eq:exact-ode-form}$ by first checking the condition where it is possible. We can expand $\eqref{eq:exact-ode-form}$:

$$
\begin{align}
\frac{d}{dt} \psi(t, y) &= 0 \\
\frac{\partial \psi}{\partial t} + \frac{\partial \psi}{\partial y}y' &= 0 \label{eq:exact-ode-form-2}.
\end{align}
$$

We can then match $\eqref{eq:exact-ode-form-2}$ with $\eqref{eq:exact-ode}$:

$$
\begin{align*}
\frac{\partial \psi}{\partial t} + \frac{\partial \psi}{\partial y}y' &= 0 \\
M(t, y) + N(t, y)y' &= 0.
\end{align*}
$$

We can clearly see that $M(t, y) = \frac{\partial \psi}{\partial t}$ and $N(t, y) = \frac{\partial \psi}{\partial y}$. Therefore, our goal is now to find $\psi(t, y)$ such that $M(t, y) = \frac{\partial \psi}{\partial t}$ and $N(t, y) = \frac{\partial \psi}{\partial y}$.
