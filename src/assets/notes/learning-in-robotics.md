# **Learning in Robotics**

<span class="subtitle">
Spring 2026 | Author: Brandon Y. Yang
</span>

---

## Review of Probability

### Basic Concepts

We denote $\Omega$ as the _sample space_, the set of all possible outcomes of a random experiment. An _event_ $A \subset \Omega$ is a subset of the sample space. For example, the set of all outcomes of two coin flips would be:
$$
\Omega = \{HH, HT, TH, TT\},
$$
and the event of getting at least one head would be:
$$
A = \{HH, HT, TH\}.
$$
The _probability measure_ $P$ assigns a probability to each event, satisfying the axioms of probability:

1. Non-negativity: $P(A) \geq 0$ for all events $A$.
2. Normalization: $P(\Omega) = 1$.
3. Additivity: If two events $A$ and $B$ are mutually exclusive (i.e., $A \cap B = \emptyset$), then

$$
P(A \cup B) = P(A) + P(B).
$$

The _conditional probability_ of an event $A$ given another event $B$ with $P(B) > 0$ is defined as:
$$
\begin{equation} \label{eq:conditional_probability}
P(A \mid B) = \frac{P(A \cap B)}{P(B)}.
\end{equation}
$$
The law of total probability states that if a finite number of events $B_1, B_2, \ldots, B_n$ form a partition of the sample space $\Omega$, i.e.,
$$
\bigcup_{i=1}^n B_i = \Omega \quad \text{and} \quad B_i \cap B_j = \emptyset \text{ for } i \neq j,
$$
then for any event $A$,
$$
\begin{equation} \label{eq:total_probability}
P(A) = \sum_{i=1}^n P(A \mid B_i) P(B_i).
\end{equation}
$$

An event $A$ is said to be _independent_ of event $B$ if:
$$
P(A \cap B) = P(A) P(B).
$$
This implies that the occurrence of event $B$ does not affect the probability of event $A$.

Event $A$ and $B$ are _mutually exclusive_ if they cannot occur simultaneously:
$$
A \cap B = \emptyset.
$$
In this case, the occurrence of event $B$ implies that event $A$ cannot occur, and vice versa.

We also introduce $\sigma$-algebra to formally define measurable events. Given a sample space $\Omega$, a $\sigma$-algebra $\mathcal{F}$ (aka. $\sigma$-field) is a collection of subsets of $\Omega$ such that:

1. $\emptyset \in \mathcal{F}$ (and thus $\Omega \in \mathcal{F}$ because of rule 2).
2. If $A \in \mathcal{F}$, then $A^c \in \mathcal{F}$ (closed under complement).
3. If $A_1, A_2, \ldots \in \mathcal{F}$, then $\bigcup_{i=1}^{\infty} A_i \in \mathcal{F}$ (closed under countable unions).

<details><summary>Example</summary>

Let $\Omega = \{1, 2, 3\}$.

1. **Trivial $\sigma$-algebra**
    $$
    \mathcal{F} = \{\emptyset, \{1, 2 , 3 \}\}.
    $$
    - **Contains $\emptyset$?** Yes.
    - **Closed under complement?** Yes, since $\emptyset^c = \{1, 2, 3\}$ and $\{1, 2, 3\}^c = \emptyset$.
    - **Closed under countable unions?** Yes, since $\emptyset \cup \{1, 2, 3\} = \{1, 2, 3\}$.

2. **An Intermediate Example**
    Suppose we only care about whether the number 1 occurs or not.
    $$
    \mathcal{F} = \{\emptyset, \{1\}, \{2, 3\}, \{1, 2, 3\}\}.
    $$
    - **Contains** $\emptyset$? Yes.
    - **Closed under complement?** Yes, since $\{1\}^c = \{2, 3\}$ and $\{2, 3\}^c = \{1\}$.
    - **Closed under countable unions?** Yes, since $\{1\} \cup \{2, 3\} = \{1, 2, 3\}$.

3. **Power Set**
    $$
    \mathcal{F} = \{\emptyset, \{1\}, \{2\}, \{3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}, \{1, 2, 3\}\}.
    $$
    - **Contains** $\emptyset$? Yes.
    - **Closed under complement?** Yes, since the complement of any subset is also in the power set.
    - **Closed under countable unions?** Yes, since the union of any subsets is also in the power set.

</details>

### Bayes' Theorem

Suppose we have $A_1, A_2, \ldots, A_n$, and their respective probabilities $P(A_1), P(A_2), \ldots, P(A_n)$, we can compute the conditional probability $P(B \mid A_i)$ with $\eqref{eq:conditional_probability}$.
$$
\begin{equation} \label{eq:bayes1}
P(B \mid A_i) = \frac{P(A_i \cap B)}{P(A_i)}.
\end{equation}
$$
Suppose we now want to compute the reverse conditional probability $P(A_i \mid B)$, we can use $\eqref{eq:conditional_probability}$ again:
$$
\begin{equation} \label{eq:bayes2}
P(A_i \mid B) = \frac{P(A_i \cap B)}{P(B)}.
\end{equation}
$$
Since $P(A_i \cap B) = P(B \mid A_i) P(A_i)$ from $\eqref{eq:bayes1}$, we can substitute it into $\eqref{eq:bayes2}$ to obtain the Bayes Theorem:
$$
\begin{equation} \label{eq:bayes_theorem}
P(A_i \mid B) = \frac{P(B \mid A_i) P(A_i)}{P(B)}.
\end{equation}
$$
$\eqref{eq:bayes_theorem}$ holds true for all events $A_i$ and $B$ with $P(A_i) > 0$ and $P(B) > 0$.

Suppose we assume $A_1, A_2, \ldots, A_n$ form a partition of the sample space $\Omega$, we can use the law of total probability to compute $P(B)$. Using the law of total probability $\eqref{eq:total_probability}$, we can express $P(B)$ as:
$$
P(B) = \sum_{j=1}^n P(B \mid A_j) P(A_j).
$$
Substituting this back into $\eqref{eq:bayes_theorem}$, we obtain the extended form of Bayes' Theorem:
$$
\begin{equation} \label{eq:bayes_theorem_extended}
P(A_i \mid B) = \frac{P(B \mid A_i) P(A_i)}{\sum_{j=1}^n P(B \mid A_j) P(A_j)}.
\end{equation}
$$

### Random Variables

A random variable is an assignment of a value to every possible outcome, defined as a function:
$$
X: \Omega \rightarrow \mathbb{R},
$$
if the set $\{\omega \in \Omega : X(\omega) \leq x\} \in \mathcal{F}$ for every $x \in \mathbb{R}$. Random variables can be classified into two main types:

1. **Discrete Random Variables**: These take on a countable number of distinct values. The probability mass function (PMF) $p_X(x)$ gives the probability that the random variable $X$ takes on the value $x$:
   $$
   \begin{equation} \label{eq:pmf}
   p_X(x) = P(X = x) = P(\{\omega \in \Omega : X(\omega) = x\}).
    \end{equation}
   $$
   The PMF satisfies:
   - $p_X(x) \geq 0$ for all $x$.
   - $\sum_{x} p_X(x) = 1$.

    A cumulative distribution function (CDF) $F_X(x)$ gives the probability that the random variable $X$ is less than or equal to $x$:
    $$  
    F_X(x) = P(X \leq x) = \sum_{t \leq x} p_X(t).
    $$
    The CDF $F_X(x)$ satisfies:
    - $F_X(x)$ is non-decreasing.
    - $\lim_{x \to -\infty} F_X(x) = 0$ and $\lim_{x \to \infty} F_X(x) = 1$.

<details><summary>Discrete RV Examples</summary>

1. **Coin Flips**

    Let $\Omega = \{HH, HT, TH, TT\}$ be the sample space for two coin flips, and define the random variable $X$ as the number of heads observed:

    $$
    X(HH) = 2, \quad X(HT) = 1, \quad X(TH) = 1, \quad X(TT) = 0.
    $$
    The possible values of $X$ are $\{0, 1, 2\}$. The PMF $p_X(x)$ is given by:

    - $p_X(0) = P(X = 0) = P(\{TT\}) = \frac{1}{4}$,
    - $p_X(1) = P(X = 1) = P(\{HT, TH\}) = \frac{1}{2}$,
    - $p_X(2) = P(X = 2) = P(\{HH\}) = \frac{1}{4}$.

    Thus, the PMF can be summarized as:
    $$
    p_X(x) = \begin{cases}
    \frac{1}{4}, & x = 0, \\
    \frac{1}{2}, & x = 1, \\
    \frac{1}{4}, & x = 2, \\
    0, & \text{o.w.}
    \end{cases}
    $$

2. **First Head in Coin Flips**

    Suppose we define a RV $Y$ as the number of flips until the first head appears, we then have the sample space
    $$
    \Omega = \{H, TH, TTH, TTTH, \ldots\}.
    $$
    Let's denote a specific outcome where the head appears at position $k$ as $\omega_k$:
    - $\omega_1 = (H)$,
    - $\omega_2 = (TH)$,
    - $\omega_k=(\underbrace{T, T, \ldots, T}_{k-1 \text { times }}, H)$.
    Therefore, the equation for measurement of each outcome is:
    $$
    P(Y= k) = P(\{\omega_k\}).
    $$
    Assuming independent trials with $P(H) = p$ and $P(T) = 1 - p$, we can compute the probability of each outcome as:
    $$
    P(\{\omega_k\}) = (1 - p)^{k-1} p.
    $$
    Thus, the PMF of $Y$ is:
    $$
    p_Y(k) = P(Y = k) = (1 - p)^{k-1} p, \quad k = 1, 2, 3, \ldots
    $$
    This is also known as the geometric distribution.

</details>

1. **Continuous Random Variables**: These take on an uncountable number of values, typically real numbers within an interval. The probability density function (PDF) is defined to be
    $$
    \begin{equation} \label{eq:pdf}
    P(a \leq X \leq b) = \int_{a}^{b} f_X(x) \, dx.
    \end{equation}
    $$
    We also have the following relationship between the PDF and CDF:
    $$
    P(-\infty < X \leq x) = F_X(x) = \int_{-\infty}^{x} f_X(t) \, dt.
    $$
    The PDF satisfies:
    - $f_X(x) \geq 0$ for all $x$.
    - $\int_{-\infty}^{\infty} f_X(x) \,dx = 1$.

<details><summary>Continuous RV Examples</summary>

1. **Uniform Distribution**

    A random variable $X$ is said to follow a uniform distribution over the interval $[a, b]$ if its PDF is given by:
    $$
    f_X(x) = \begin{cases}
    \frac{1}{b - a}, & a \leq x \leq b, \\
    0, & \text{o.w.}
    \end{cases}
    $$
    The CDF of $X$ is:
    $$
    F_X(x) = \begin{cases}
    0, & x < a, \\
    \frac{x - a}{b - a}, & a \leq x \leq b, \\
    1, & x > b.
    \end{cases}
    $$
2. **Normal Distribution**
    A random variable $X$ is said to follow a normal distribution with mean $\mu$ and variance $\sigma^2$ if its PDF is given by:
    $$
    f_X(x) = \frac{1}{\sigma \sqrt{2 \pi}} e^{-\frac{(x - \mu)^2}{2 \sigma^2}}, \quad x \in \mathbb{R}.
    $$
    The CDF of $X$ does not have a closed-form expression, but it can be computed using numerical methods or standard normal distribution tables.

</details>

### Expectation and Variance

For a discrete random variable $X$ with PMF $p_X(x)$, the expectation (or mean) is defined as:
$$
\begin{equation} \label{eq:expectation_discrete}
E[X] = \sum_{x} x \, p_X(x).
\end{equation}
$$
Properties of expectation include:
$$
\begin{align}
E[aX + b] & = a E[X] + b, \\
E[X + Y] & = E[X] + E[Y], \\
E[XY] & = E[X] E[Y], \quad \text{if }X \text{ and } Y \text{ are independent} \\
E[g(X)] & = \sum_{x} g(x) \, p_X(x). \label{eq:function_expectation}
\end{align}
$$
From $\eqref{eq:function_expectation}$, we can take $g(x) = x^2$ to compute $E[X^2]$, which is then followed by the variance:
$$
\begin{equation} \label{eq:variance_discrete}
\begin{split}
Var(X) & = E[(X - E[X])^2] \\
       & = E[X^2] - (E[X])^2 \\
       & = \sum_{x} (x - E[X])^2 \, p_X(x).
\end{split}
\end{equation}
$$
Properties of variance include:
$$
\begin{align}
Var(aX + b) & = a^2 Var(X), \\
Var(X + Y) & = Var(X) + Var(Y), \quad \text{if }X \text{ and } Y \text{ are independent}.
\end{align}
$$
For a continuous random variable $X$ with PDF $f_X(x)$, the expectation is defined as:
$$
\begin{equation} \label{eq:expectation_continuous}
E[X] = \int_{-\infty}^{\infty} x \, f_X(x) \, dx.
\end{equation}
$$
The properties of expectation for continuous random variables are similar to those for discrete random variables:
$$
\begin{equation} \label{eq:expectation_properties_continuous}
E[g(X)] = \int_{-\infty}^{\infty} g(x) \, f_X(x) \, dx.
\end{equation}
$$
The variance for continuous random variables is defined as:
$$
\begin{equation} \label{eq:variance_continuous}
\begin{split}
Var(X) & = E[(X - E[X])^2] \\
       & = E[X^2] - (E[X])^2 \\
       & = \int_{-\infty}^{\infty} (x - E[X])^2 \, f_X(x) \, dx.
\end{split}
\end{equation}
$$

<details><summary>Expectation and Variance Examples</summary>

1. **Discrete RV Example**

    Consider a fair six-sided die, where the random variable $X$ represents the outcome of a roll. The PMF is:
    $$
    p_X(x) = \begin{cases}
    \frac{1}{6}, & x = 1, 2, 3, 4, 5, 6, \\
    0, & \text{o.w.}
    \end{cases}
    $$
    The expectation of $X$ is:
    $$
    E[X] = \sum_{x=1}^{6} x \cdot \frac{1}{6} = \frac{1 + 2 + 3 + 4 + 5 + 6}{6} = 3.5.
    $$
    The variance of $X$ is:
    $$
    Var(X) = E[X^2] - (E[X])^2,
    $$
    where
    $$
    E[X^2] = \sum_{x=1}^{6} x^2 \cdot \frac{1}{6} = \frac{1^2 + 2^2 + 3^2 + 4^2 + 5^2 + 6^2}{6} = \frac{91}{6}.
    $$
    Thus,
    $$
    Var(X) = \frac{91}{6} - (3.5)^2 = \frac{35}{12} \approx 2.9167.
    $$
2. **Continuous RV Example**
    Consider a random variable $Y$ that follows a uniform distribution over the interval $[0, 1]$. The PDF is:
    $$
    f_Y(y) = \begin{cases}
    1, & 0 \leq y \leq 1, \\
    0, & \text{o.w.}
    \end{cases}
    $$
    The expectation of $Y$ is:
    $$
    E[Y] = \int_{0}^{1} y \cdot 1 \, dy = \left[ \frac{y^2}{2} \right]_{0}^{1} = \frac{1}{2}.
    $$
    The variance of $Y$ is:
    $$
    Var(Y) = E[Y^2] - (E[Y])^2,
    $$
    where
    $$
    E[Y^2] = \int_{0}^{1} y^2 \cdot 1 \, dy = \left[ \frac{y^3}{3} \right]_{0}^{1} = \frac{1}{3}.
    $$
    Thus,
    $$
    Var(Y) = \frac{1}{3} - \left(\frac{1}{2}\right)^2 = \frac{1}{12}.
    $$

</details>

### Joint Distributions

For two random variables $X$ and $Y$, the joint distribution characterizes their simultaneous behavior.

The **Joint PMF** $p_{X,Y}(x,y)$ and **Joint CDF** $F_{X,Y}(x,y)$ are defined as:
$$
\begin{equation} \label{eq:joint_pmf}
p_{X,Y}(x,y) = P(X = x, Y = y),
\end{equation}
$$
$$
\begin{equation} \label{eq:joint_cdf}
F_{X,Y}(x,y) = P(X \leq x, Y \leq y) = \sum_{t \leq x} \sum_{s \leq y} p_{X,Y}(t,s).
\end{equation}
$$
**Marginal PMFs** are obtained by summing the joint PMF over the other variable:
$$
\begin{equation} \label{eq:marginal_pmf}
p_X(x) = \sum_{y} p_{X,Y}(x,y), \quad p_Y(y) = \sum_{x} p_{X,Y}(x,y).
\end{equation}
$$
The **Conditional PMF** of $X$ given $Y=y$ is:
$$
\begin{equation} \label{eq:conditional_pmf}
p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}, \quad \text{if } p_Y(y) > 0.
\end{equation}
$$

The **Joint PDF** $f_{X,Y}(x,y)$ satisfies:
$$
P(X \in A, Y \in B) = \int_{B} \int_{A} f_{X,Y}(x,y) \, dx \, dy.
$$
**Marginal PDFs** are obtained by integrating out the other variable:
$$
\begin{equation} \label{eq:marginal_pdf}
f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y) \, dy, \quad f_Y(y) = \int_{-\infty}^{\infty} f_{X,Y}(x,y) \, dx.
\end{equation}
$$
The **Conditional PDF** of $X$ given $Y=y$ is:
$$
\begin{equation} \label{eq:conditional_pdf}
f_{X \mid Y}(x \mid y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}, \quad \text{if } f_Y(y) > 0.
\end{equation}
$$

Expectations can be computed over joint, marginal, or conditional distributions. The **Joint Expectation** of a function $g(X, Y)$ is:
$$
\begin{align}
E[g(X, Y)] &= \sum_{x} \sum_{y} g(x, y) \, p_{X,Y}(x,y) \\
E[g(X, Y)] &= \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} g(x, y) \, f_{X,Y}(x,y) \, dx \, dy
\end{align}
$$
The **Conditional Expectation** $E[X \mid Y=y]$ is computed using the conditional distribution:
$$
\begin{align}
E[X \mid Y=y] &= \sum_{x} x \, p_{X \mid Y}(x \mid y) \\
E[X \mid Y=y] &= \int_{-\infty}^{\infty} x \, f_{X \mid Y}(x \mid y) \, dx
\end{align}
$$
Marginal expectations $E[X]$ and variances $Var(X)$ follow the standard single-variable formulas using the derived marginal PMFs or PDFs.

### Covariance and Independence

The **Covariance** between two random variables $X$ and $Y$ measures their linear relationship:
$$
\begin{equation} \label{eq:covariance}
\begin{split}
Cov(X, Y) & = E[(X - E[X])(Y - E[Y])] \\
          & = E[XY] - E[X]E[Y].
\end{split}
\end{equation}
$$
The **Correlation Coefficient** standardizes covariance, providing a unitless measure in $[-1, 1]$:
$$
\rho_{X,Y} = \frac{Cov(X, Y)}{\sqrt{Var(X) Var(Y)}}.
$$

Two random variables $X$ and $Y$ are **independent** if and only if their joint distribution factorizes into the product of their marginals:
$$
\begin{align}
p_{X,Y}(x,y) &= p_X(x) p_Y(y) && \text{(Discrete)} \\
f_{X,Y}(x,y) &= f_X(x) f_Y(y) && \text{(Continuous)}
\end{align}
$$
If $X$ and $Y$ are independent, then:
$$
E[XY] = E[X]E[Y] \implies Cov(X, Y) = 0.
$$
**Note:** The converse is not necessarily true; zero covariance (uncorrelatedness) does not imply independence, as non-linear dependencies may still exist.

<details><summary>Comprehensive Joint Distribution Example</summary>

Let us consider a scenario involving a robot's operational state.
Let $X$ represent the **Robot Mode**, where $X=1$ denotes "Idle" and $X=2$ denotes "Active".
Let $Y$ represent the **Power Consumption Level**, where $Y=1$ is "Low", $Y=2$ is "Medium", and $Y=3$ is "High".

**1. Joint Probability Mass Function (PMF)**

The joint probabilities $p_{X,Y}(x,y)$ are given by:
$$
p_{X,Y}(x,y) = \begin{cases}
0.2, & x=1, y=1, \\
0.1, & x=1, y=2, \\
0, & x=1, y=3, \\
0.1, & x=2, y=1, \\
0.3, & x=2, y=2, \\
0.3, & x=2, y=3, \\
0, & \text{otherwise}.
\end{cases}
$$

**2. Deriving Marginal PMFs**

We obtain the marginal distributions by summing the joint probabilities over the other variable.

- For **Robot Mode ($X$)**:
    $$
    \begin{align*}
    p_X(1) &= 0.2 + 0.1 + 0 = 0.3 \\
    p_X(2) &= 0.1 + 0.3 + 0.3 = 0.7
    \end{align*}
    $$
    $$
    p_X(x) = \begin{cases}
    0.3, & x=1, \\
    0.7, & x=2, \\
    0, & \text{o.w.}
    \end{cases}
    $$

- For **Power Consumption ($Y$)**:
    $$
    \begin{align*}
    p_Y(1) &= 0.2 + 0.1 = 0.3 \\
    p_Y(2) &= 0.1 + 0.3 = 0.4 \\
    p_Y(3) &= 0 + 0.3 = 0.3
    \end{align*}
    $$
    $$
    p_Y(y) = \begin{cases}
    0.3, & y=1, \\
    0.4, & y=2, \\  
    0.3, & y=3, \\
    0, & \text{o.w.}
    \end{cases}
    $$

**3. Deriving Conditional PMF**

Suppose we observe **Medium Power** ($Y=2$). We calculate the conditional distribution of $X$ given $Y=2$ using $p_{X \mid Y}(x \mid 2) = \frac{p_{X,Y}(x, 2)}{p_Y(2)}$:
$$
\begin{align*}
P(X=1 \mid Y=2) &= \frac{0.1}{0.4} = 0.25 \\
P(X=2 \mid Y=2) &= \frac{0.3}{0.4} = 0.75
\end{align*}
$$

**4. Calculating Expectations**

We can now compute expectations using the marginal and conditional distributions derived above.

- **Marginal Expectations ($E[X]$ and $E[Y]$):**
    $$
    \begin{align*}
    E[X] &= \sum_{x} x \, p_X(x) = 1(0.3) + 2(0.7) = 1.7. \\
    E[Y] &= \sum_{y} y \, p_Y(y) = 1(0.3) + 2(0.4) + 3(0.3) = 2.0.
    \end{align*}
    $$

- **Conditional Expectation ($E[X \mid Y=2]$):**
    $$
    E[X \mid Y=2] = \sum_{x} x \, p_{X \mid Y}(x \mid 2) = 1(0.25) + 2(0.75) = 1.75.
    $$
    _Interpretation: When power usage is Medium, the expected robot mode is closer to Active (1.75) than the general average (1.7)._

- **Joint Expectation ($E[XY]$):**
    $$
    \begin{align*}
    E[XY] &= \sum_{x}\sum_{y} xy \, p_{X,Y}(x,y) \\
          &= (1\cdot1)(0.2) + (1\cdot2)(0.1) + (2\cdot1)(0.1) + (2\cdot2)(0.3) + (2\cdot3)(0.3) \\
          &= 0.2 + 0.2 + 0.2 + 1.2 + 1.8 = 3.6.
    \end{align*}
    $$

**5. Variance and Covariance**

- **Variance ($Var(X)$):**
    First, compute the second moment $E[X^2]$:
    $$
    E[X^2] = 1^2(0.3) + 2^2(0.7) = 3.1.
    $$
    Then, apply the variance formula:
    $$
    Var(X) = E[X^2] - (E[X])^2 = 3.1 - (1.7)^2 = 0.21.
    $$

- **Covariance ($Cov(X,Y)$):**
    Using the $E[XY]$ calculated in Step 4:
    $$
    Cov(X, Y) = E[XY] - E[X]E[Y] = 3.6 - (1.7)(2.0) = 0.2.
    $$
    _A positive covariance indicates that higher power consumption is associated with the Active robot mode._

**6. Independence Check**

Are $X$ and $Y$ independent? We check if $p_{X,Y}(x,y) = p_X(x) p_Y(y)$ for a test case $(1,1)$:
$$
p_{X,Y}(1,1) = 0.2 \quad \neq \quad p_X(1) p_Y(1) = (0.3)(0.3) = 0.09.
$$
Since the joint probability does not equal the product of the marginals, $X$ and $Y$ are **not** independent.

</details>
