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

<details><summary>Example: Total Probability in Localization</summary>

Suppose a robot operates in two distinct zones: **Indoor** ($Z_{in}$) and **Outdoor** ($Z_{out}$). Based on its deployment schedule, the probability of the robot being in each zone is:
$$
P(Z_{in}) = 0.8, \quad P(Z_{out}) = 0.2.
$$
Let $E$ be the event that the robot's GPS signal is **Lost**. The probability of losing the signal depends on the zone:

- Indoors, the signal is lost frequently: $P(E \mid Z_{in}) = 0.9$.
- Outdoors, the signal is lost rarely: $P(E \mid Z_{out}) = 0.05$.

Using the **Law of Total Probability**, we can find the overall probability that the robot has lost its GPS signal:
$$
\begin{align*}
P(E) &= P(E \mid Z_{in}) P(Z_{in}) + P(E \mid Z_{out}) P(Z_{out}) \\
     &= (0.9)(0.8) + (0.05)(0.2) \\
     &= 0.72 + 0.01 \\
     &= 0.73.
\end{align*}
$$
Thus, there is a $73\%$ chance the robot has no GPS signal at any random moment.

</details>

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

The Expectation (or mean) of a random variable $X$ is defined as:
$$
\begin{equation} \label{eq:expectation_discrete}
E[X] = \sum_{x} x \, p_X(x) \quad \text{(Discrete)},
\end{equation}
$$
$$
\begin{equation} \label{eq:expectation_continuous}
E[X] = \int_{-\infty}^{\infty} x \, f_X(x) \, dx \quad \text{(Continuous)}.
\end{equation}
$$
Properties of Expectation:
$$
\begin{align}
E[aX + b] & = a E[X] + b, \\
E[X + Y] & = E[X] + E[Y], \\
E[XY] & = E[X] E[Y] \quad \text{(if independent)}, \\
E[g(X)] & = \sum_{x} g(x) \, p_X(x) \quad \text{or} \quad \int g(x) f_X(x) dx. \label{eq:function_expectation}
\end{align}
$$

The Variance measures the spread of $X$ from its mean $\mu = E[X]$. It is defined generally as $Var(X) = E[(X - \mu)^2]$, or computationally as:
$$
\begin{equation} \label{eq:variance_calc}
Var(X) = E[X^2] - (E[X])^2.
\end{equation}
$$
The specific formulas are:
$$
\begin{align}
Var(X) &= \sum_{x} (x - \mu)^2 \, p_X(x) & \text{(Discrete)} \label{eq:variance_discrete} \\
Var(X) &= \int_{-\infty}^{\infty} (x - \mu)^2 \, f_X(x) \, dx & \text{(Continuous)} \label{eq:variance_continuous}
\end{align}
$$
Properties of Variance:
$$
\begin{align}
Var(aX + b) & = a^2 Var(X), \\
Var(X + Y) & = Var(X) + Var(Y) \quad \text{(if independent)} \\
Var(X + Y) & = Var(X) + Var(Y) + 2 \mathrm{Cov}(X, Y) \quad \text{(general case)}.
\end{align}
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

The Joint PMF $p_{X,Y}(x,y)$ and Joint CDF $F_{X,Y}(x,y)$ are defined as:
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
Marginal PMFs are obtained by summing the joint PMF over the other variable:
$$
\begin{equation} \label{eq:marginal_pmf}
p_X(x) = \sum_{y} p_{X,Y}(x,y), \quad p_Y(y) = \sum_{x} p_{X,Y}(x,y).
\end{equation}
$$
The Conditional PMF of $X$ given $Y=y$ is:
$$
\begin{equation} \label{eq:conditional_pmf}
p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}, \quad \text{if } p_Y(y) > 0.
\end{equation}
$$

The Joint PDF $f_{X,Y}(x,y)$ satisfies:
$$
P(X \in A, Y \in B) = \int_{B} \int_{A} f_{X,Y}(x,y) \, dx \, dy.
$$
Marginal PDFs are obtained by integrating out the other variable:
$$
\begin{equation} \label{eq:marginal_pdf}
f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y) \, dy, \quad f_Y(y) = \int_{-\infty}^{\infty} f_{X,Y}(x,y) \, dx.
\end{equation}
$$
The Conditional PDF of $X$ given $Y=y$ is:
$$
\begin{equation} \label{eq:conditional_pdf}
f_{X \mid Y}(x \mid y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}, \quad \text{if } f_Y(y) > 0.
\end{equation}
$$

Expectations can be computed over joint, marginal, or conditional distributions. The Joint Expectation of a function $g(X, Y)$ is:
$$
\begin{align}
E[g(X, Y)] &= \sum_{x} \sum_{y} g(x, y) \, p_{X,Y}(x,y) \\
E[g(X, Y)] &= \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} g(x, y) \, f_{X,Y}(x,y) \, dx \, dy
\end{align}
$$
The Conditional Expectation $E[X \mid Y=y]$ is computed using the conditional distribution:
$$
\begin{align}
E[X \mid Y=y] &= \sum_{x} x \, p_{X \mid Y}(x \mid y) \\
E[X \mid Y=y] &= \int_{-\infty}^{\infty} x \, f_{X \mid Y}(x \mid y) \, dx
\end{align}
$$
Marginal expectations $E[X]$ and variances $Var(X)$ follow the standard single-variable formulas using the derived marginal PMFs or PDFs.

The covariance between two random variables $X$ and $Y$ is defined as:
$$
\begin{equation} \label{eq:covariance}
Cov(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y].
\end{equation}
$$
An equivalent and often more convenient form is:
$$
\begin{equation} \label{eq:covariance_alternative}
Cov(X, Y) = E[XY] - E[X]E[Y].
\end{equation}
$$
In the discrete case:
$$
\begin{equation} \label{eq:covariance_discrete}
Cov(X, Y) = \sum_{x} \sum_{y} (x - E[X])(y - E[Y]) p_{X,Y}(x,y)
\end{equation}
$$
and in the continuous case:
$$
\begin{equation} \label{eq:covariance_continuous}
Cov(X, Y) = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} (x - E[X])(y - E[Y]) f_{X,Y}(x,y) \, dx \, dy
\end{equation}
$$
The variance is a special case of covariance:
$$
\begin{equation} \label{eq:variance_covariance}
Var(X) = Cov(X, X).
\end{equation}
$$
If $X$ and $Y$ are independent, then $Cov(X, Y) = 0$, but the converse is not necessarily true.

### Multivariate Distributions

We generalize the concept of joint distributions to a sequence or set of $N$ random variables $X_1, X_2, \ldots, X_N$. The joint distribution characterizes the probability of these variables simultaneously taking specific values $x_1, x_2, \ldots, x_N$.

To maintain generality for both discrete (PMF) and continuous (PDF) variables, we denote the joint distribution simply as:
$$
\begin{equation} \label{eq:general_joint}
p(x_1, \ldots, x_N) = p(X_1 = x_1, \ldots, X_N = x_N).
\end{equation}
$$

Any joint distribution can be factorized into a product of conditional probabilities. By repeatedly applying the definition of conditional probability, we obtain the **Chain Rule**:
$$
\begin{equation} \label{eq:chain_rule}
\begin{aligned}
p(x_1, \ldots, x_N) &= p(x_1) p(x_2 \mid x_1) p(x_3 \mid x_1, x_2) \cdots p(x_N \mid x_1, \ldots, x_{N-1}) \\
p(x_1, \ldots, x_N) &= \prod_{i=1}^N p(x_i \mid x_1, \ldots, x_{i-1}).
\end{aligned}
\end{equation}
$$

We perform marginalization to recover the distribution of a subset of variables from a joint distribution.

For example, to find the marginal distribution of $X_1$ from the joint distribution $p(x_1, \ldots, x_N)$, we sum over all possible values of $X_2, \ldots, X_N$:
$$
\begin{equation} \label{eq:general_marginal}
p(x_1) = \sum_{x_2} \cdots \sum_{x_N} p(x_1, \ldots, x_N).
\end{equation}
$$

In the continuous case, the sums are replaced by integrals:
$$
p(x_1) = \int \cdots \int p(x_1, \ldots, x_N)\, dx_2 \cdots dx_N.
$$

More generally, for any subset of components $x_A$, the marginal $p(x_A)$ is obtained by summing or integrating over the complementary components $x_{\bar A}$.

<details><summary>Proof of Chain Rule</summary>

We rearrange the definition of conditional probability from $\eqref{eq:conditional_pmf}$ to solve for the joint distribution $p(x,y)$:
$$
p(x, y) = p(x \mid y) p(y).
$$
Now consider three random variables $X_1, X_2, X_3$. We can treat the pair $(X_1, X_2)$ as a single random variable and apply the above equation:
$$
\begin{align*}
p(x_1, x_2, x_3) & = p(x_3 \mid x_1, x_2) p(x_1, x_2).
\end{align*}
$$
We can then solve for the joint $p(x_1, x_2)$ using the same equation:
$$
p(x_1, x_2) = p(x_2 \mid x_1) p(x_1).
$$
Substituting this back, we have:
$$
\begin{align*}
p(x_1, x_2, x_3) & = p(x_3 \mid x_1, x_2) p(x_2 \mid x_1) p(x_1).
\end{align*}
$$
By repeating this process for $N$ random variables, we arrive at the chain rule in $\eqref{eq:chain_rule}$.

</details>

For an $N$-dimensional random vector $X = (X_1, \ldots, X_N)^\top$, the expectation is defined component-wise:
$$
E[X] =
\begin{bmatrix}
E[X_1] \\
\vdots \\
E[X_N]
\end{bmatrix}.
$$
Expectations are linear. In particular, for random vectors $X, Y \in \mathbb{R}^N$,
$$
\begin{equation} \label{eq:multivariate_expectation_addition}
E[X + Y] = E[X] + E[Y].
\end{equation}
$$
More generally, for scalars $a, b \in \mathbb{R}$,
$$
E[aX + bY] = aE[X] + bE[Y].
$$

The **covariance matrix** of an $N$-dimensional random vector $X$ is defined as:
$$
\begin{equation} \label{eq:covariance_matrix_def}
\operatorname{Cov}(X) = \Sigma = E\!\left[(X - E[X])(X - E[X])^\top\right],
\end{equation}
$$
where $\Sigma \in \mathbb{R}^{N \times N}$ is an $N \times N$ matrix.

The $(i,j)$-th entry of this matrix is the covariance between $X_i$ and $X_j$:
$$
\begin{equation} \label{eq:covariance_entries}
\Sigma_{ij} = \operatorname{Cov}(X)_{ij} = \operatorname{Cov}(X_i, X_j) = E\!\left[(X_i - E[X_i])(X_j - E[X_j])\right].
\end{equation}
$$
In particular, the diagonal entries are the variances:
$$
\Sigma_{ii} = \operatorname{Cov}(X)_{ii} = \operatorname{Var}(X_i).
$$
An equivalent and often useful expression for the covariance matrix is:
$$
\begin{equation} \label{eq:covariance_alt}
\Sigma = \operatorname{Cov}(X) = E[XX^\top] - E[X]E[X]^\top.
\end{equation}
$$
If the components $X_i$ and $X_j$ are independent, then $\Sigma_{ij} = \operatorname{Cov}(X_i, X_j) = 0$, though the converse is not necessarily true.

#### More About Covariance

Covariance has a similar property to variance in terms of scaling and addition. For any scalar $a \in \mathbb{R}$, we have
$$
\begin{equation} \label{eq:covariance_scaling}
\operatorname{Cov}(aX) = a^2 \operatorname{Cov}(X).
\end{equation}
$$
For any two random vectors $X, Y \in \mathbb{R}^N$, we have
$$
\begin{align}
\operatorname{Cov}(X + Y) &= \operatorname{Cov}(X) + \operatorname{Cov}(Y) + \operatorname{Cov}(X, Y) + \operatorname{Cov}(Y, X). \label{eq:covariance_addition} \\
\operatorname{Cov}(X + Y) &= \operatorname{Cov}(X) + \operatorname{Cov}(Y), \quad \text{if } X \text{ and } Y \text{ are independent} \label{eq:covariance_addition_independent}
\end{align}
$$

The covariance matrix $\Sigma$ is, by construction, symmetric and positive semi-definite. This means it can be factorized as
$$
\Sigma = U \Lambda U^\top, \quad U U^\top = U^\top U = I, \quad \Lambda = \operatorname{diag}(\lambda_1, \ldots, \lambda_N) \geq 0.
$$
where $U \in \mathbb{R}^{N \times N}$ is an orthonormal matrix and $\Lambda \in \mathbb{R}^{N \times N}$ is a diagonal matrix with non-negative entries (the eigenvalues of $\Sigma$). The trace of the covariance matrix $\operatorname{tr}(\Sigma)$ is the sum of its eigenvalues and also the sum of marginal variances:
$$
\begin{equation} \label{eq:covariance_trace}
\operatorname{tr}(\Sigma) = \sum_{i=1}^N \Sigma_{ii} = \sum_{i=1}^N \Lambda_{i} = \sum_{i=1}^N \operatorname{Var}(X_i).
\end{equation}
$$

We also have a few more properties of matrix traces that are useful in the context of covariance matrices.

For matrices $A, B$, we have
$$
\begin{equation} \label{eq:trace_cyclic}
\operatorname{tr}(AB) = \operatorname{tr}(BA),
\end{equation}
$$
where the two matrices are not necessarily square, but the products $AB$ and $BA$ must be square.

For $A, B \in \mathbb{R}^{m \times n}$, we have
$$
\begin{equation} \label{eq:trace_product}
\operatorname{tr}(A^\top B) = \operatorname{tr}(B^\top A) =  \sum_{i=1}^m \sum_{j=1}^n B_{ij} A_{ij}.
\end{equation}
$$

<details><summary>Multivariate Gaussian Distribution</summary>

The multivariate $d$-dimensional Gaussian distribution with mean $\mu \in \mathbb{R}^d$ and covariance matrix $\Sigma \in \mathbb{R}^{d \times d}$ is defined by the PDF:
$$
\begin{equation} \label{eq:gaussian_pdf}
f_X(x) = \frac{1}{\sqrt{\operatorname{det}(2\pi\Sigma)}} \exp\left(-\frac{1}{2}(x - \mu)^\top \Sigma^{-1} (x - \mu)\right), \quad x \in \mathbb{R}^d.
\end{equation}
$$
We can simplify the left part with the property $\operatorname{det}(cA) = c^n \operatorname{det}(A)$ for $A \in \mathbb{R}^{n \times n}$ and $c \in \mathbb{R}$:
$$
\begin{align*}
\frac{1}{\sqrt{\operatorname{det}(2\pi\Sigma)}} &= \frac{1}{\sqrt{(2\pi)^d \operatorname{det}(\Sigma)}} \\
&= \frac{1}{(2\pi)^{d/2} \sqrt{\operatorname{det}(\Sigma)}}
\end{align*}
$$
We can also remember the fact:
$$
\begin{equation} \label{eq:gaussian_integral}
\int_{x \in \mathbb{R}^d} \exp\left(-\frac{1}{2}(x - \mu)^\top \Sigma^{-1} (x - \mu)\right) dx = (2\pi)^{d/2} \sqrt{\operatorname{det}(\Sigma)}.
\end{equation}
$$
This ensures that the PDF integrates to 1 over $\mathbb{R}^d$.

Given two Gaussian RV $X, Y \in \mathbb{R}^d$ and $Z = X + Y$, we have
$$
\begin{equation} \label{eq:gaussian_sum}
E[Z] = E[X + Y] = E[X] + E[Y]
\end{equation}
$$
with covariance
$$
\begin{equation} \label{eq:gaussian_sum_covariance}
\operatorname{Cov}(Z)=\Sigma_Z=\Sigma_X+\Sigma_Y+\Sigma_{X Y}+\Sigma_{Y X}
\end{equation}
$$
where
$$
\Sigma_{X Y} = E[(X - E[X])(Y - E[Y])^\top], \quad \Sigma_{Y X} = E[(Y - E[Y])(X - E[X])^\top].
$$
If $X$ and $Y$ are independent, then $\Sigma_{X Y} = \Sigma_{Y X} = 0$, and we have $\Sigma_Z = \Sigma_X + \Sigma_Y$. In this case, the sum of two independent Gaussian RV is also Gaussian.

Suppose $X \in \mathbb{R}^d$ is a Gaussian RV:
$$
X \sim \mathcal{N}(\mu_X, \Sigma_X), \quad \mu_X \in \mathbb{R}^d, \Sigma_X \in \mathbb{R}^{d \times d}.
$$
Let
$$
Y = A X, \quad A \in \mathbb{R}^{m \times d}, Y \in \mathbb{R}^m.
$$
Then $Y$ is also Gaussian:
$$
\begin{equation}\label{eq:gaussian_linear_transform}
Y = AX,\; X \sim \mathcal{N}(\mu_X,\Sigma_X)\;\Longrightarrow\; Y \sim \mathcal{N}\!\big(A\mu_X,\;A\Sigma_XA^\top\big).
\end{equation}
$$

</details>

### Independence

Two random variables $X$ and $Y$ are independent if the occurrence of one does not affect the probability distribution of the other. We derive this from the definition of conditional probability $\eqref{eq:conditional_pmf}$. Suppose $X$ is independent of $Y$, then:
$$
p(x \mid y) = p(x).
$$
Substituting this back into $\eqref{eq:conditional_pmf}$ an solving for $p(x, y)$, we derive the independence condition:
$$
\begin{equation} \label{eq:independence}
p(x, y) = p(x) p(y).
\end{equation}
$$

Two random variables $X$ and $Y$ are said to be _conditionally independent_ given a third variable $Z$ if knowledge of $Z$ decouples $X$ from $Y$. Mathematically:
$$
\begin{equation} \label{eq:conditional_independence}
p(x, y \mid z) = p(x \mid z) p(y \mid z).
\end{equation}
$$
Equivalently, this implies that once $Z$ is known, knowing $Y$ provides no additional information about $X$:
$$
\begin{equation} \label{eq:conditional_independence_equivalent}
p(x \mid y, z) = p(x \mid z).
\end{equation}
$$

We extend Bayes' Theorem $\eqref{eq:bayes_theorem}$ to use Random Variables:
$$
\begin{align}
p_{X \mid Y}(x \mid y) &= \frac{p_{Y \mid X}(y \mid x) p_X(x)}{p_Y(y)} \label{eq:bayes_rv} \\
f_{X \mid Y}(x \mid y) &= \frac{f_{Y \mid X}(y \mid x) f_X(x)}{f_Y(y)} \label{eq:bayes_rv_continuous}
\end{align}
$$
Conditioning Bayes' Theorem on an additional variable $Z$ gives:
$$
\begin{equation} \label{eq:conditioned-bayes}
p(x \mid y, z) = \frac{p(y \mid x, z) p(x \mid z)}{p(y \mid z)}
\end{equation}
$$
To find the denominator, we can use the law of total probability conditioned on $Z$:
$$
\begin{equation} \label{eq:total_probability_conditioned}
p(y \mid z) = \sum_{x} p(y \mid x, z) p(x \mid z).
\end{equation}
$$

<details><summary>Comprehensive Joint Distribution Example</summary>

Let us consider a scenario involving a robot's operational state.
Let $X$ represent the **Robot Mode**, where $X=1$ denotes "Idle" and $X=2$ denotes "Active".
Let $Y$ represent the **Power Consumption Level**, where $Y=1$ is "Low", $Y=2$ is "Medium", and $Y=3$ is "High".

The joint probabilities $p_{X,Y}(x,y)$ are given by:
$$
p_{X,Y}(x,y) = \begin{cases}
0.2, & x=1, y=1, \\
0.1, & x=1, y=2, \\
0, & x=1, y=3, \\
0.1, & x=2, y=1, \\
0.3, & x=2, y=2, \\
0.3, & x=2, y=3, \\
0, & \text{o.w}.
\end{cases}
$$

We obtain the marginal distributions by summing the joint probabilities over the other variable by following $\eqref{eq:marginal_pmf}$.

- For Robot Mode ($X$):
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

- For Power Consumption ($Y$):
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

We obtain the conditional distributions by applying $\eqref{eq:conditional_pmf}$.
$$
p_{X \mid Y}(x \mid y) = \begin{cases}
\frac{2}{3}, & x=1, y=1, \\
\frac{1}{3}, & x=2, y=1, \\
\frac{1}{4}, & x=1, y=2, \\
\frac{3}{4}, & x=2, y=2, \\
0, & x=1, y=3, \\
1, & x=2, y=3, \\
0, & \text{o.w.}
\end{cases}
$$
$$
p_{Y \mid X}(y \mid x) = \begin{cases}
\frac{2}{3}, & y=1, x=1, \\
\frac{1}{3}, & y=2, x=1, \\
0, & y=3, x=1, \\
\frac{1}{7}, & y=1, x=2, \\
\frac{3}{7}, & y=2, x=2, \\
\frac{3}{7}, & y=3, x=2, \\
0, & \text{o.w.}
\end{cases}
$$

</details>

## State Estimation using Bayes Rule

We define a random variable $X$ representing the **state** of the robot and a random variable $Y$ representing the **observation**. Our goal is to estimate the posterior belief about the state given measurements.

From $\eqref{eq:bayes_rv}$, we have:

- $p_{X \mid Y} (x \mid y)$ or $f_{X \mid Y}(x \mid y)$: _Posterior_ distribution of state $X$ given observation $Y=y$.
- $p_{Y \mid X} (y \mid x)$ or $f_{Y \mid X}(y \mid x)$: _Likelihood_ of observation $Y=y$ given state $X=x$.
- $p_X(x)$ or $f_X(x)$: _Prior_ distribution of state $X$ before observing $Y$.
- $p_Y(y)$ or $f_Y(y)$: _Marginal likelihood_ of observation $Y=y$.

**Single Observation Update**: Using $\eqref{eq:bayes_rv}$, we compute the posterior by updating the prior with the likelihood:
$$
\begin{equation} \label{eq:bayes_single}
p_{X \mid Y}(x \mid y) = \frac{p_{Y \mid X}(y \mid x) p_X(x)}{p_Y(y)} = \eta \cdot p_{Y \mid X}(y \mid x) p_X(x), \text{ where } \eta = \frac{1}{p_Y(y)}.
\end{equation}
$$
Here, $\eta$ is a normalization constant ensuring the posterior sums to 1.

**Recursive Update ($n$ Observations)**: Suppose we receive a sequence of observations $y_1, y_2, \ldots, y_n$. We can extent $\eqref{eq:bayes_single}$ by treating all observations as a single joint observation:
$$
\begin{equation} \label{eq:bayes_multiple}
p\left(x \mid y_1, \ldots, y_n\right)=\frac{p\left(y_1, \ldots, y_n \mid x\right) p(x)}{p\left(y_1, \ldots, y_n\right)} = \eta \cdot p\left(y_1, \ldots, y_n \mid x\right) p(x)
\end{equation}
$$
Now assume each observation is conditionally independent given the state $X$, which follows the property in $\eqref{eq:conditional_independence}$. Therefore, we expand the conditional probability on the RHS:
$$
\begin{equation} \label{eq:conditional_independence_expanded}
p\left(y_1, \ldots, y_n \mid x\right) = \prod_{i=1}^n p\left(y_i \mid x\right).
\end{equation}
$$
Next we substitute $\eqref{eq:conditional_independence_expanded}$ into $\eqref{eq:bayes_multiple}$ to get:
$$
\begin{align}
p\left(x \mid y_1, \ldots, y_n\right) &= \eta \cdot \left(\prod_{i=1}^n p\left(y_i \mid x\right)\right) p(x) \\
&= \eta \left( p\left(y_n \mid x\right) \prod_{i=1}^{n-1} p\left(y_i \mid x\right) \right) p(x) \\
&= \eta \cdot p\left(y_n \mid x\right) \cdot \left( \prod_{i=1}^{n-1} p\left(y_i \mid x\right) \right)p(x)  \label{eq:bayes_multiple_expanded}.
\end{align}
$$
We notice that the term in the parentheses in $\eqref{eq:bayes_multiple_expanded}$ follow the same form as $\eqref{eq:conditional_independence_expanded}$ but with $n-1$ observations. Therefore:
$$
\begin{align}
p\left(x \mid y_1, \ldots, y_n\right) &= \eta \cdot p\left(y_n \mid x\right) \cdot \underbrace{p\left(y_1, \ldots, y_{n - 1} \mid x\right) p(x)}_{\propto  \; p\left(x \mid y_1, \ldots, y_{n-1}\right) \text{ b/c } {\eqref{eq:bayes_multiple}}.} \\
&= \eta \cdot p\left(y_n \mid x\right) \cdot p\left(x \mid y_1, \ldots, y_{n-1}\right).
\end{align}
$$
Now, we have derived the recursive form of Bayes' Theorem for updating the posterior with each new observation:
$$
\begin{equation} \label{eq:bayes_recursive}
\begin{aligned}
p(x \mid y_1, \ldots, y_n)
&= \eta \cdot p(y_n \mid x) \cdot p(x \mid y_1, \ldots, y_{n-1}), \\
\text{where } \eta
&= \frac{1}{p(y_n \mid y_1, \ldots, y_{n-1})}.
\end{aligned}
\end{equation}
$$
We notice how $\eqref{eq:bayes_recursive}$ reduces to $\eqref{eq:bayes_single}$ when $n=1$. To compute the normalization constant $\eta$, we can use the law of total probability conditioned on all previous observations:
$$
\begin{equation} \label{eq:total_probability_recursive}
p(y_n \mid y_1, \ldots, y_{n-1}) = \sum_{x} p(y_n \mid x) p(x \mid y_1, \ldots, y_{n-1}).
\end{equation}
$$

<details><summary>Example: Recursive Bayesian Estimation (Door Sensor)</summary>

Let $X$ be the random variable for the door state and $Y = \left( Y_1, Y_2, Y_3 \right)$ be the joint random variable for 3 sensor readings. The realizations are $x \in \{\text{open}, \text{closed}\}$ and $y \in \{0, 1\}$, where $1$ indicates the sensor reads "Open".

Suppose we have prior knowledge that the door is equally likely to be open or closed:
$$
p_X(x) = \begin{cases}
0.5, & x = \text{open}, \\
0.5, & x = \text{closed}.
\end{cases}
$$
And suppose we have a sensor with the following characteristics ($p_{Y \mid X}$):

- If the door is open, the sensor correctly reads "Open" ($y=1$) with probability $0.6$.
- If the door is closed, the sensor incorrectly reads "Open" ($y=1$) with probability $0.3$.

$$
p_{Y \mid X}(y \mid x) = \begin{cases}
0.6, & y=1, x=\text{open}, \\
0.4, & y=0, x=\text{open}, \\
0.3, & y=1, x=\text{closed}, \\
0.7, & y=0, x=\text{closed}.
\end{cases}
$$

Suppose we receive a sequence of sensor readings: $y_1 = 1, y_2 = 0, y_3 = 1$. We want to find the probability that the door is open after all three readings.

From $\eqref{eq:bayes_recursive}$, the recursive updates are:
$$
\begin{align*}
p_{X \mid Y_1, Y_2, Y_3}(x \mid y_1, y_2, y_3) &= \eta_3 \cdot p_{Y \mid X}(y_3 \mid x) \cdot p_{X \mid Y_1, Y_2}(x \mid y_1, y_2) \\
p_{X \mid Y_1, Y_2}(x \mid y_1, y_2) &= \eta_2 \cdot p_{Y \mid X}(y_2 \mid x) \cdot p_{X \mid Y_1}(x \mid y_1) \\
p_{X \mid Y_1}(x \mid y_1) &= \eta_1 \cdot p_{Y \mid X}(y_1 \mid x) \cdot p_X(x)

\end{align*}
$$
We can compute these step by step starting with the prior $p_X(x)$ and following $\eqref{eq:total_probability_recursive}$ to compute $\eta_i$.

1. **After first reading $y_1 = 1$**:
    $$
    \begin{align*}
    p_{X \mid Y_1}(\text{open} \mid 1) & = \eta_1 \cdot p_{Y \mid X}(1 \mid \text{open}) \cdot p_X(\text{open}) \\
    & = \eta_1 \cdot 0.6 \cdot 0.5 =  \eta_1 \cdot 0.3, \\
    p_{X \mid Y_1}(\text{closed} \mid 1) & = \eta_1 \cdot p_{Y \mid X}(1 \mid \text{closed}) \cdot p_X(\text{closed}) \\
    & = \eta_1 \cdot 0.3 \cdot 0.5 = \eta_1 \cdot 0.15.
    \end{align*}
    $$
    Normalizing gives $\eta_1 = \frac{1}{0.3 + 0.15} = \frac{1}{0.45}$, so:
    $$
    p_{X \mid Y_1}(\text{open} \mid 1) = \frac{2}{3}, \quad p_{X \mid Y_1}(\text{closed} \mid 1) = \frac{1}{3}.
    $$
2. **After second reading $y_2 = 0$**:
    $$
    \begin{align*}
    p_{X \mid Y_1, Y_2}(\text{open} \mid 1, 0) & = \eta_2 \cdot p_{Y \mid X}(0 \mid \text{open}) \cdot p_{X \mid Y_1}(\text{open} \mid 1) \\
    & = \eta_2 \cdot 0.4 \cdot \frac{2}{3} = \eta_2 \cdot \frac{4}{15}, \\
    p_{X \mid Y_1, Y_2}(\text{closed} \mid 1, 0) & = \eta_2 \cdot p_{Y \mid X}(0 \mid \text{closed}) \cdot p_{X \mid Y_1}(\text{closed} \mid 1) \\
    & = \eta_2 \cdot 0.7 \cdot \frac{1}{3} = \eta_2 \cdot \frac{7}{30}.
    \end{align*}
    $$
    Normalizing gives $\eta_2 = \frac{1}{\frac{4}{15} + \frac{7}{30}} = 2$, so:
    $$
    p_{X \mid Y_1, Y_2}(\text{open} \mid 1, 0) = \frac{8}{15}, \quad p_{X \mid Y_1, Y_2}(\text{closed} \mid 1, 0) = \frac{7}{15}.
    $$
3. **After third reading $y_3 = 1$**:
    $$
    \begin{align*}
    p_{X \mid Y_1, Y_2, Y_3}(\text{open} \mid 1, 0, 1) & = \eta_3 \cdot p_{Y \mid X}(1 \mid \text{open}) \cdot p_{X \mid Y_1, Y_2}(\text{open} \mid 1, 0) \\
    & = \eta_3 \cdot 0.6 \cdot \frac{8}{15} = \eta_3 \cdot \frac{16}{50}, \\
    p_{X \mid Y_1, Y_2, Y_3}(\text{closed} \mid 1, 0, 1) & = \eta_3 \cdot p_{Y \mid X}(1 \mid \text{closed}) \cdot p_{X \mid Y_1, Y_2}(\text{closed} \mid 1, 0) \\
    & = \eta_3 \cdot 0.3 \cdot \frac{7}{15} = \eta_3 \cdot \frac{7}{50}.
    \end{align*}
    $$
    Normalizing gives $\eta_3 = \frac{1}{\frac{16}{50} + \frac{7}{50}} = \frac{50}{23}$, so:
    $$
    p_{X \mid Y_1, Y_2, Y_3}(\text{open} \mid 1, 0, 1) = \frac{16}{23} \approx 0.6957, \quad p_{X \mid Y_1, Y_2, Y_3}(\text{closed} \mid 1, 0, 1) = \frac{7}{23} \approx 0.3043.
    $$

After processing the three sensor readings, the robot estimates that there is approximately a $69.57\%$ chance that the door is open.

</details>

From $\eqref{eq:bayes_recursive}$, we can expand the posterior after $n$ observations to obtain the **Expanded Bayesian Estimation**:
$$
\begin{equation} \label{eq:bayes_expanded}
\begin{aligned}
p(x \mid y_1, \ldots, y_n) &= \eta \cdot p(x) \prod_{i=1}^{n} p(y_i \mid x) \\
\text{where } \eta &= \frac{1}{p(y_1, \ldots, y_n)} = \frac{1}{\sum_{x'} \left[ p(x') \prod_{i=1}^n p(y_i \mid x') \right]}.
\end{aligned}
\end{equation}
$$
This formulation highlights how each new observation incrementally updates our belief about the state $X$.

<details><summary>Proof of Expanded Bayesian Estimation</summary>

We aim to derive the expanded posterior form $\eqref{eq:bayes_expanded}$ starting from the recursive update rule $\eqref{eq:bayes_recursive}$.

**Assumption:** The observations $Y_1, \ldots, Y_n$ are conditionally independent given the state $X$.

**Base Case ($n=1$):**
For a single observation, the recursive update $\eqref{eq:bayes_recursive}$ simplifies to the single observation update $\eqref{eq:bayes_single}$.
$$
\begin{equation} \label{eq:proof_base}
p(x \mid y_1) = \eta_1 \cdot p(y_1 \mid x) p(x).
\end{equation}
$$
This matches the form of $\eqref{eq:bayes_expanded}$ for $n=1$.

**Inductive Step:**
Assume that the expanded form holds for $n-1$ observations (Inductive Hypothesis). That is:
$$
\begin{equation} \label{eq:proof_hypothesis}
p(x \mid y_1, \ldots, y_{n-1}) = \eta_{1:n-1} \cdot p(x) \prod_{i=1}^{n-1} p(y_i \mid x),
\end{equation}
$$
where $\eta_{1:n-1}$ represents the accumulated normalization constant for the sequence up to $n-1$.

Now, consider the recursive update for the $n$-th step given by $\eqref{eq:bayes_recursive}$:
$$
\begin{equation} \label{eq:proof_recursive_step}
p(x \mid y_1, \ldots, y_n) = \eta_n \cdot p(y_n \mid x) \cdot p(x \mid y_1, \ldots, y_{n-1}).
\end{equation}
$$

Substitute the Inductive Hypothesis $\eqref{eq:proof_hypothesis}$ into the recursive equation $\eqref{eq:proof_recursive_step}$:
$$
\begin{equation} \label{eq:proof_sub}
p(x \mid y_1, \ldots, y_n) = \eta_n \cdot p(y_n \mid x) \cdot \left[ \eta_{1:n-1} \cdot p(x) \prod_{i=1}^{n-1} p(y_i \mid x) \right].
\end{equation}
$$

We can combine the scalar normalization constants into a single constant $\eta = \eta_n \cdot \eta_{1:n-1}$.
We can also combine the likelihood term $p(y_n \mid x)$ with the product term:
$$
\begin{equation} \label{eq:proof_combine}
p(y_n \mid x) \cdot \prod_{i=1}^{n-1} p(y_i \mid x) = \prod_{i=1}^{n} p(y_i \mid x).
\end{equation}
$$

Substituting $\eqref{eq:proof_combine}$ back into $\eqref{eq:proof_sub}$, we obtain:
$$
\begin{equation} \label{eq:proof_final}
p(x \mid y_1, \ldots, y_n) = \eta \cdot p(x) \prod_{i=1}^{n} p(y_i \mid x).
\end{equation}
$$

This confirms that the recursive application of Bayes' rule results in the product of individual likelihoods, recovering $\eqref{eq:bayes_expanded}$.

</details>

<details><summary>Example: Expanded Bayesian Estimation</summary>

Following the previous door sensor example where $y_1 = 1, y_2 = 0, y_3 = 1$, we can express the posterior after three observations using the expanded batch formula $\eqref{eq:bayes_expanded}$:
$$
p_{X \mid Y_1, Y_2, Y_3}(x \mid y_1, y_2, y_3) = \eta \cdot \underbrace{p_X(x) \prod_{i=1}^3 p_{Y \mid X}(y_i \mid x)}_{\tilde{p}(x)}.
$$

We first compute the unnormalized mass $\tilde{p}(x)$ for each hypothesis.
$$
\begin{align*}
\tilde{p}(\text{open}) &= p_X(\text{open}) \cdot p_{Y \mid X}(1 \mid \text{open}) \cdot p_{Y \mid X}(0 \mid \text{open}) \cdot p_{Y \mid X}(1 \mid \text{open}) \\
&= 0.5 \cdot (0.6 \cdot 0.4 \cdot 0.6) \\
&= 0.5 \cdot 0.144 \\
&= 0.072. \\
\tilde{p}(\text{closed}) &= p_X(\text{closed}) \cdot p_{Y \mid X}(1 \mid \text{closed}) \cdot p_{Y \mid X}(0 \mid \text{closed}) \cdot p_{Y \mid X}(1 \mid \text{closed}) \\
&= 0.5 \cdot (0.3 \cdot 0.7 \cdot 0.3) \\
&= 0.5 \cdot 0.063 \\
&= 0.0315.
\end{align*}
$$

The total probability of the observation sequence is the sum of the unnormalized masses:
$$
p_{Y_1, Y_2, Y_3}(1, 0, 1) = \tilde{p}(\text{open}) + \tilde{p}(\text{closed}) = 0.072 + 0.0315 = 0.1035.
$$
Thus, the normalization constant is $\eta = \frac{1}{0.1035}$.

We can now compute the posterior probabilities:
$$
\begin{align*}
p_{X \mid Y_1, Y_2, Y_3}(\text{open} \mid 1, 0, 1) &= \frac{0.072}{0.1035} = \frac{720}{1035} = \frac{16}{23} \approx 0.6957, \\
p_{X \mid Y_1, Y_2, Y_3}(\text{closed} \mid 1, 0, 1) &= \frac{0.0315}{0.1035} = \frac{315}{1035} = \frac{7}{23} \approx 0.3043.
\end{align*}
$$

This result matches the recursive method exactly, confirming that the door is open with probability $\frac{16}{23}$.

</details>

### Markov Chains

A sequence of random variables $X_0, X_1, X_2, \ldots$ is called a Discrete-Time Markov Chain (DTMC) if it satisfies the Markov property:
$$
\begin{equation} \label{eq:markov_property}
p(X_{n+1} \mid X_n, X_{n-1}, \ldots, X_0) = p(X_{n+1} \mid X_n),
\end{equation}
$$
which states that **future state depends only on the present state, not on the sequence of events that preceded it**.

The random variables $X_n$ take values from a countable set $S$ called the state space. Each element $i \in S$ represents a distinct configuration of the system (e.g., a robot's location on a grid).

For a time-homogeneous Markov chain, the probability of transitioning from state $i$ to state $j$ is independent of time $n$. We define the one-step transition probabilities as:
$$
\begin{equation} \label{eq:transition_probabilities}
p_{ij} = p(X_{n+1} = j \mid X_n = i), \quad \forall n \geq 0, \; i, j \in S.
\end{equation}
$$
These probabilities must satisfy:

- $0 \leq p_{ij} \leq 1$ for all $i, j \in S$,
- $\sum_{j \in S} p_{ij} = 1$ for all $i \in S$ (the system must transition to some state).

We can arrange these probabilities into a transition matrix $P$, where the entry in the $i$-th row and $j$-th column is $p_{ij}$:
$$
\begin{equation} \label{eq:transition_matrix}
P = \begin{bmatrix}
p_{11} & p_{12} & p_{13} & \cdots \\
p_{21} & p_{22} & p_{23} & \cdots \\
p_{31} & p_{32} & p_{33} & \cdots \\
\vdots & \vdots & \vdots & \ddots
\end{bmatrix}.
\end{equation}
$$

We can then derive the $k$-step transition probabilities by taking the $k$-th power of the transition matrix:
$$
\begin{equation} \label{eq:k_step_transition}
P^{(k)} = P^k,
\end{equation}
$$
where the entry $p_{ij}^{(k)}$ gives the probability of transitioning from state $i$ to state $j$ in $k$ steps:
$$
p_{ij}^{(k)} = p(X_{n+k} = j \mid X_n = i).
$$

<details><summary>Example: Markov Chain State Diagram</summary>

Suppose we have state space
$$
S = \{\text{Idle}, \text{Moving}, \text{Working}\}
$$
with the following one-step transition probabilities:
$$
P = \begin{bmatrix}
0.5 & 0.5 & 0.0 \\
0.2 & 0.4 & 0.4 \\
0.1 & 0.0 & 0.9
\end{bmatrix}.
$$
The corresponding state diagram is shown below:

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, ->, auto, node distance=3cm]

  % --- Nodes (defined exactly like your working example) ---
  % I used explicit coordinates to form a triangle layout
  \node [circle, draw, minimum size=1.5cm] (idle) at (0, 0) {Idle};
  \node [circle, draw, minimum size=1.5cm] (moving) at (4, 2) {Moving};
  \node [circle, draw, minimum size=1.5cm] (working) at (4, -2) {Working};

  % --- Edges (Transitions) ---
  % Using standard \draw with 'to' and 'bend' for curves
  
  % 1. Self Loops (using standard TikZ loops)
  \draw (idle) to [loop left] node {0.5} (idle);
  \draw (moving) to [loop above] node {0.4} (moving);
  \draw (working) to [loop right] node {0.9} (working);

  % 2. Transitions between states
  % Idle -> Moving
  \draw (idle) to [bend left] node {0.5} (moving);

  % Moving -> Idle & Moving -> Working
  \draw (moving) to [bend left] node {0.2} (idle);
  \draw (moving) to [bend left] node {0.4} (working);

  % Working -> Idle
  \draw (working) to [bend left] node {0.1} (idle);

\end{tikzpicture}
\end{document}
```

</details>

#### Evolution of a Markov Chain

The probability of being in a state $j$ at time $k + 1$ can be written as the sum over all possible previous states $i$ of the probability of being in state $i$ at time $k$ multiplied by the transition probability from $i$ to $j$:
$$
\begin{equation} \label{eq:chapman_kolmogorov_step_swapped}
p(X_{k+1} = j) = \sum_{i \in S} p(X_{k+1} = j \mid X_k = i)\, p(X_k = i)
= \sum_{i \in S} p_{ij}\, p(X_k = i).
\end{equation}
$$
This summation can be expressed compactly using linear algebra. We define a column vector $\pi^{(k)}$ representing the **probability distribution over states** at time $k$:
$$
\pi^{(k)} = \begin{bmatrix} p(X_k = 1) \\ p(X_k = 2) \\ \vdots \\ p(X_k = M) \end{bmatrix},
$$
where $S = \{1, 2, \ldots, M\}$. The evolution of the probability distribution from time $k$ to $k+1$ is then given by:
$$
\begin{equation} \label{eq:state_propagation}
\pi^{(k+1)} = P^T \pi^{(k)},
\end{equation}
$$
where $P^T$ is the transpose of the transition matrix defined in $\eqref{eq:transition_matrix}$.
By induction, the state distribution at any future time step $n$ given an initial distribution $\pi^{(0)}$ is:
$$
\begin{equation} \label{eq:n_step_propagation}
\pi^{(n)} = (P^T)^n \pi^{(0)}.
\end{equation}
$$
This result is fundamental in robotics for **predictive modeling**. If we know the current state uncertainty ($\pi^{(0)}$) and the system dynamics ($P$), we can predict the distribution of the robot's state $n$ steps into the future.

As $n \to \infty$, the probability distribution $\pi^{(n)}$ may converge to a fixed vector $\pi$ that does not change as time progresses. This is known as the **stationary distribution** and satisfies the eigenvector equation:
$$
\begin{equation} \label{eq:stationary_distribution}
\pi = P^T \pi, \quad \text{subject to } \sum_{i \in S} \pi_i = 1.
\end{equation}
$$
The condition $\sum \pi_i = 1$ ensures that $\pi$ remains a valid probability distribution. For the robot, this represents the long-term probability of being in each state if the system evolves indefinitely without external intervention.

<details><summary>Example: Markov Chain State Evolution</summary>

Continuing from the previous Markov chain example with states $S = \{\text{Idle}, \text{Moving}, \text{Working}\}$ and transition matrix:
$$
P = \begin{bmatrix}
0.5 & 0.5 & 0.0 \\
0.2 & 0.4 & 0.4 \\
0.1 & 0.0 & 0.9
\end{bmatrix},
$$
suppose the robot starts in the $\text{Idle}$ state with certainty:
$$
\pi^{(0)} = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}.
$$  
To find the state distribution after one time step ($k=1$), we use the transpose $P^T$:
$$
\begin{align*}
\pi^{(1)} &= P^T \pi^{(0)} \\
&= \begin{bmatrix}
0.5 & 0.2 & 0.1 \\
0.5 & 0.4 & 0.0 \\
0.0 & 0.4 & 0.9
\end{bmatrix} \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix} \\
&= \begin{bmatrix} 0.5 \\ 0.5 \\ 0.0 \end{bmatrix}.
\end{align*}
$$
To find the state distribution after two time steps ($k=2$):
$$
\begin{align*}
\pi^{(2)} &= P^T \pi^{(1)} \\
&= \begin{bmatrix}
0.5 & 0.2 & 0.1 \\
0.5 & 0.4 & 0.0 \\
0.0 & 0.4 & 0.9
\end{bmatrix} \begin{bmatrix} 0.5 \\ 0.5 \\ 0.0 \end{bmatrix} \\
&= \begin{bmatrix} 0.35 \\ 0.45 \\ 0.20 \end{bmatrix}.
\end{align*}
$$
Alternatively, we can use $\eqref{eq:n_step_propagation}$ to compute $\pi^{(2)}$ directly:
$$
\begin{align*}
\pi^{(2)} &= (P^T)^2 \pi^{(0)} \\
&= \begin{bmatrix}
0.5 & 0.2 & 0.1 \\
0.5 & 0.4 & 0.0 \\
0.0 & 0.4 & 0.9
\end{bmatrix}^2 \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix} \\
&= \begin{bmatrix} 0.35 \\ 0.45 \\ 0.20 \end{bmatrix}.  
\end{align*}
$$

Suppose we want to find the stationary distribution $\pi$ satisfying $\pi = P^T \pi$. We set up the equations:
$$
\begin{align*}
\pi_1 &= 0.5 \pi_1 + 0.2 \pi_2 + 0.1 \pi_3, \\
\pi_2 &= 0.5 \pi_1 + 0.4 \pi_2 + 0.0 \pi_3, \\
\pi_3 &= 0.0 \pi_1 + 0.4 \pi_2 + 0.9 \pi_3, \\
\pi_1 + \pi_2 + \pi_3 &= 1.
\end{align*}
$$
Solving this system, we find:
$$
\pi^{(\infty)} = \lim_{n \to \infty} \pi^{(n)}
\approx \begin{bmatrix} 0.1935 \\ 0.1613 \\ 0.6452 \end{bmatrix}.
$$

```component

{
    componentName: "MarkovChain"
}

```

</details>

### Hidden Markov Models (HMM)

A Hidden Markov Model is a sequence of random variables $Y_1, \ldots, Y_n$ such that the distribution of $Y_k$ only depends upon the _hidden state_ $X_k$ of the associated Markov chain.

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, ->, auto, node distance=2.5cm]

  % --- Nodes ---
  % Row 1: Hidden States (X)
  \node [circle, draw, minimum size=1.2cm] (x1) at (0, 0) {$X_1$};
  \node [circle, draw, minimum size=1.2cm] (x2) at (3, 0) {$X_2$};
  \node [circle, draw, minimum size=1.2cm] (dots) at (6, 0) {$\dots$};
  \node [circle, draw, minimum size=1.2cm] (xn) at (9, 0) {$X_n$};

  % Row 2: Observations (Y)
  \node [circle, draw, minimum size=1.2cm] (y1) at (0, -2.5) {$Y_1$};
  \node [circle, draw, minimum size=1.2cm] (y2) at (3, -2.5) {$Y_2$};
  \node [circle, draw, minimum size=1.2cm] (ydots) at (6, -2.5) {$\dots$};
  \node [circle, draw, minimum size=1.2cm] (yn) at (9, -2.5) {$Y_n$};

  % --- Edges ---
  
  % 1. Transition Model (Horizontal)
  \draw (x1) to node {$p(x_2|x_1)$} (x2);
  \draw (x2) to node {} (dots);
  \draw (dots) to node {} (xn);

  % 2. Emission Model (Vertical)
  \draw (x1) to node [swap] {$p(y_1|x_1)$} (y1);
  \draw (x2) to node [swap] {$p(y_2|x_2)$} (y2);
  \draw (dots) to node [swap] {} (ydots);
  \draw (xn) to node [swap] {$p(y_n|x_n)$} (yn);

\end{tikzpicture}
\end{document}
```

Formally, A Hidden Markov Model (HMM) is a pair of stochastic processes
$\{X_k\}_{k=1}^{n}$ and $\{Y_k\}_{k=1}^{n}$ where:

- $X_k$ is the (unobserved) **hidden state** at time $k$, taking values in a countable state space $S$.
- $Y_k$ is the **observation** at time $k$, taking values in an observation space $\mathcal{O}$.

An HMM is specified by parameters
$$
\lambda = (\pi, P, M)
$$
where $\pi \in \mathbb{R}^{|S|}$ is the initial distribution, $P \in \mathbb{R}^{|S| \times |S|}$ is the state transition matrix, and $M \in \mathbb{R}^{|S| \times |\mathcal{O}|}$ is the emission (measurement) model.

The model is defined by the following assumptions.

First, the hidden state process satisfies the Markov property:
$$
\begin{equation} \label{eq:hmm_markov}
p\left(X_k \mid X_{k - 1}, \ldots, X_1 \right) = p \left(X_k \mid X_{k - 1} \right), \quad \forall k \geq 2.
\end{equation}
$$
We define the initial distribution by
$$
\begin{equation} \label{eq:hmm_initial_distribution}
\pi_i = p(X_1 = i), \quad i \in S, \quad \text{with } \sum_{i \in S} \pi_i = 1,
\end{equation}
$$
and the one-step transition probabilities by
$$
\begin{equation} \label{eq:hmm_transition_probabilities}
P_{ij} = p(X_k = j \mid X_{k-1} = i), \quad i, j \in S, \; k \geq 2, \quad \text{with } \sum_{j \in S} P_{ij} = 1.
\end{equation}
$$

Second, the observations are _conditionally independent_ $\eqref{eq:conditional_independence_equivalent}$ given the hidden states and only depend on the current state:
$$
\begin{equation} \label{eq:hmm_emission}
p(Y_k \mid X_1, \ldots, X_k, Y_1, \ldots, Y_{k-1}) = p(Y_k \mid X_k), \quad \forall k \geq 1.
\end{equation}
$$
We parameterize this distribution by the emission model
$$
\begin{equation} \label{eq:hmm_emission_model}
M_{iy} = p(Y_k = y \mid X_k = i), \quad i \in S, \; y \in \mathcal{O}.
\end{equation}
$$
Under these assumptions, the joint distribution over a state sequence $x_{1:n}$ and an observation sequence $y_{1:n}$ can be factorized as:
$$
\begin{equation} \label{eq:hmm_factorization}
p(x_{1:n}, y_{1:n}) = \pi_{x_1} M_{x_1, y_1} \prod_{k=2}^n P_{x_{k-1}, x_k} M_{x_k, y_k}.
\end{equation}
$$

<details><summary>Proof of HMM Factorization</summary>

We start with the joint distribution of the state and observation sequences:
$$
p(x_{1:n}, y_{1:n}) = p(x_1, y_1, x_2, y_2, \ldots, x_n, y_n).
$$
Using the chain rule of probability $\eqref{eq:chain_rule}$, we can factor this joint distribution as:
$$
\begin{align*}
p(x_{1:n}, y_{1:n}) &= p(x_1) \\
& \; \cdot p(y_1 \mid x_1) \\
& \; \cdot p(x_2 \mid x_1, y_1) \\
& \; \cdot p(y_2 \mid x_1, y_1, x_2) \\
& \; \vdots \\
& \; \cdot p(x_k \mid x_{1:k-1}, y_{1:k-1}) \\
& \; \cdot p(y_k \mid x_{1:k}, y_{1:k-1}) \\
& \; \vdots \\
& \; \cdot p(x_n \mid x_{1:n-1}, y_{1:n-1}) \\
& \; \cdot p(y_n \mid x_{1:n}, y_{1:n-1}).
\end{align*}
$$
Applying the markov property $\eqref{eq:hmm_markov}$, we can simplify the state transition terms:
$$
p(x_k \mid x_{1:k-1}, y_{1:k-1}) = p(x_k \mid x_{k-1}).
$$
Applying the conditional independence assumption $\eqref{eq:hmm_emission}$, we can simplify the emission terms:
$$
p(y_k \mid x_{1:k}, y_{1:k-1}) = p(y_k \mid x_k).
$$
Substituting these simplifications back into the chain rule expansion:
$$
\begin{equation} \label{eq:hmm_factorization_proof}
p(x_{1:n}, y_{1:n}) = p(x_1) p(y_1 \mid x_1) \prod_{k=2}^n \left [p(x_k \mid x_{k-1}) p(y_k \mid x_k)\right].
\end{equation}
$$
Finally, we map these probability terms to the model parameters:

- $p(x_1) = \pi_{x_1}$ (initial distribution),
- $p(x_k \mid x_{k-1}) = P_{x_{k-1}, x_k}$ (transition probabilities),
- $p(y_k \mid x_k) = M_{x_k, y_k}$ (emission probabilities). Thus, we arrive at the factorized form that is consistent with $\eqref{eq:hmm_factorization}$:

</details>

<details><summary>HMM Example</summary>

Suppose a robot moves in a hallway with 3 positions:
$$
S = \{1, 2, 3\}
$$
where these are hidden states $X_k \in S$. The robot has a sensor that observes whether it is near a door or wall:
$$
\mathcal{O} = \{\text{door}, \text{wall}\}
$$
where these are observations $Y_k \in \mathcal{O}$.

Assume robot starts in the middle with high probability:
$$
\pi_1 = 0.1, \quad \pi_2 = 0.8, \quad \pi_3 = 0.1,
$$
which can be written as a column vector:
$$
\pi = \begin{bmatrix} 0.1 \\ 0.8 \\ 0.1 \end{bmatrix}.
$$
Suppose the robot has the following transition probabilities:
$$
P=\left[\begin{array}{lll}
0.7 & 0.3 & 0.0 \\
0.2 & 0.6 & 0.2 \\
0.0 & 0.3 & 0.7
\end{array}\right]
$$
For example, $P_{12} = p(X_k = 2 \mid X_{k-1} = 1) = 0.3$ means that if the robot is at position 1 at time $k-1$, it has a 30% chance of moving to position 2 at time $k$.

Suppose position 2 is near a door, position 1 and 3 are near walls, and the sensor is noisy with the following emission probabilities:
$$
\begin{array}{ll}
M_{1, \text { wall }}=p\left(Y_k=\text { wall } \mid X_k=1\right)=0.9, & M_{1, \text { door }}=p\left(Y_k=\text { door } \mid X_k=1\right)=0.1, \\
M_{2, \text { door }}=p\left(Y_k=\text { door } \mid X_k=2\right)=0.8, & M_{2, \text { wall }}=p\left(Y_k=\text { wall } \mid X_k=2\right)=0.2, \\
M_{3, \text { wall }}=p\left(Y_k=\text { wall } \mid X_k=3\right)=0.9, & M_{3, \text { door }}=p\left(Y_k=\text { door } \mid X_k=3\right)=0.1 .
\end{array}
$$
Equivalently, we can write the emission model as a matrix:
$$
M=\left[\begin{array}{ll}
M_{1, \text { door }} & M_{1, \text { wall }} \\
M_{2, \text { door }} & M_{2, \text { wall }} \\
M_{3, \text { door }} & M_{3, \text { wall }}
\end{array}\right]=\left[\begin{array}{ll}
0.1 & 0.9 \\
0.8 & 0.2 \\
0.1 & 0.9
\end{array}\right] .
$$
Now the full HMM is:
$$
\lambda = (\pi, P, M),
$$
with
$$
\pi = \begin{bmatrix} 0.1 \\ 0.8 \\ 0.1 \end{bmatrix}, \quad P=\left[\begin{array}{lll}
0.7 & 0.3 & 0.0 \\
0.2 & 0.6 & 0.2 \\
0.0 & 0.3 & 0.7
\end{array}\right], \quad M=\left[\begin{array}{ll}
0.1 & 0.9 \\
0.8 & 0.2 \\
0.1 & 0.9
\end{array}\right].
$$

</details>

This probabilistic model provides a unified framework for several fundamental inference problems in robotics and state estimation.

Given an HMM specified by
$$
\lambda = (\pi, P, M),
$$
and an observation sequence
$$
y_{1:n} = (y_1, y_2, \ldots, y_n),
$$
the central tasks can be formulated as the following inference problems:

1. **Filtering**
    Given observations up to time $k$, compute the distribution of the state at time $k$:
    $$
    \begin{equation} \label{eq:hmm_filtering_problem}
    p(x_k \mid y_{1:k}).
    \end{equation}
    $$
    This is the belief state at time $k$, which represents our uncertainty about the current state given all past observations. In robotics, this corresponds to estimating the robot’s current state as new sensor data arrives sequentially.
2. **Smoothing**
    Given observations up to time $k$, compute the distribution of the state at anytime $j < k$:
    $$
    \begin{equation} \label{eq:hmm_smoothing_problem}
    p(x_j \mid y_{1:k}) ,\quad j < k.
    \end{equation}
    $$
    We use both **past and future** observations (relative to time $j$) to improve the estimate of an earlier state. In robotics, smoothing is useful for offline analysis, mapping, or trajectory refinement after data collection.
3. **Prediction**

    Given observations up to time $k$, compute the distribution of the state at a time $j > k$:
    $$
    \begin{equation} \label{eq:hmm_prediction_problem}
    p(x_j \mid y_{1:k}) ,\quad j > k.
    \end{equation}
    $$
    This uses the system dynamics to project uncertainty forward in time beyond the last observation. In robotics, prediction is used for forecasting motion, planning, and anticipating future states of the system.
4. **Decoding**:
    Given observations up to time $k$, find the most likely hidden state sequence:
    $$
    \begin{equation} \label{eq:hmm_decoding_problem}
    x^*_{1:k} = \arg\max_{x_{1:k}} p(x_{1:k} \mid y_{1:k}).
    \end{equation}
    $$
    This finds the single most probably trajectory of hidden states explaining the observations. In robotics and speech recognition, this corresponds to trajectory estimation or sequence labeling (typically solved by the Viterbi algorithm).
5. **Likelihood of Observations**:
    Given the observation trajectory $y_{1:k}$, compute the probability:
    $$
    \begin{equation} \label{eq:hmm_likelihood_problem}
    p(y_{1:k}).
    \end{equation}
    $$
    This measures how well the model explains the data.

These problems can be solved with forward-backward algorithms, Viterbi algorithm, and other dynamic programming techniques tailored for HMMs.

#### Forward Algorithm

Given an observed sequence $y_{1:n}$, we define the **forward variable** $\alpha_k(i)$ as the joint probability of the observation sequence up to time $k$ and the state being $i$ at time $k$:
$$
\begin{equation} \label{eq:forward_variable}
\alpha_k(i) = p(Y_{1:k} = y_{1:k}, X_k = i).
\end{equation}
$$
The algorithm proceeds recursively:

1. **Base Case** ($k=1$): Using the definition of conditional probability $\eqref{eq:conditional_pmf}$:
   $$
   \begin{equation} \label{eq:forward_base_case}
   \alpha_1(i) = p(y_1, X_1 = i) = p(y_1 \mid X_1 = i) p(X_1 = i) = M_{i, y_1} \pi_i.
   \end{equation}
   $$
2. **Recursive Case** ($k > 1$): We can express $\alpha_k(j)$ in terms of $\alpha_{k-1}(i)$:
   $$
   \begin{equation} \label{eq:forward_recursive_case}
   \alpha_k(j) = \left[ \sum_{i \in S} \alpha_{k-1}(i)P_{ij} \right] M_{j, y_k}.
   \end{equation}
   $$
3. **Termination**: The likelihood of the observation sequence is the sum of the forward variables at time $n$:
   $$
    \begin{equation} \label{eq:forward_termination}
   p(y_{1:n}) = \sum_{i \in S} \alpha_n(i).
    \end{equation}
   $$

<details><summary>Forward Algorithm Example</summary>

Following the previous HMM example:
$$
\mathcal{O} = \{\text{door}, \text{wall}\}, \quad S = \{1, 2, 3\}, \quad \lambda = (\pi, P, M),
$$
with
$$
\pi = \begin{bmatrix} 0.1 \\ 0.8 \\ 0.1 \end{bmatrix}, \quad P=\left[\begin{array}{lll}
0.7 & 0.3 & 0.0 \\
0.2 & 0.6 & 0.2 \\
0.0 & 0.3 & 0.7
\end{array}\right], \quad M=\left[\begin{array}{ll}
0.1 & 0.9 \\
0.8 & 0.2 \\
0.1 & 0.9
\end{array}\right].
$$
Suppose we observe:
$$
y_{1:3} = (\text{door}, \text{wall}, \text{door}).
$$
We'll compute:
$$
\alpha_1(i), \alpha_2(i), \alpha_3(i) \quad \text{for } i = 1, 2, 3.
$$
We initialize with $k=1$ with $y_1 = \text{door}$ following $\eqref{eq:forward_base_case}$:
$$
\begin{align*}
\alpha_1(1) &= M_{1, \text{door}} \pi_1 = 0.1 \cdot 0.1 = 0.01, \\
\alpha_1(2) &= M_{2, \text{door}} \pi_2 = 0.8 \cdot 0.8 = 0.64, \\
\alpha_1(3) &= M_{3, \text{door}} \pi_3 = 0.1 \cdot 0.1 = 0.01.
\end{align*}
$$
Next, we compute $\alpha_2(j)$ for $j = 1, 2, 3$ with $y_2 = \text{wall}$ using $\eqref{eq:forward_recursive_case}$:
$$
\begin{align*}
\alpha_2(1) &= \left[ \alpha_1(1)P_{11} + \alpha_1(2)P_{21} + \alpha_1(3)P_{31} \right] M_{1, \text{wall}}, \\
&= \left[ 0.01 \cdot 0.7 + 0.64 \cdot 0.2 + 0.01 \cdot 0.0 \right] \cdot 0.9 = 0.1215 \\
\alpha_2(2) &= \left[ \alpha_1(1)P_{12} + \alpha_1(2)P_{22} + \alpha_1(3)P_{32} \right] M_{2, \text{wall}}, \\
&= \left[ 0.01 \cdot 0.3 + 0.64 \cdot 0.6 + 0.01 \cdot 0.3 \right] \cdot 0.2 = 0.078, \\
\alpha_2(3) &= \left[ \alpha_1(1)P_{13} + \alpha_1(2)P_{23} + \alpha_1(3)P_{33} \right] M_{3, \text{wall}}, \\
&= \left[ 0.01 \cdot 0.0 + 0.64 \cdot 0.2 + 0.01 \cdot 0.7 \right] \cdot 0.9 = 0.1215.
\end{align*}
$$
Finally we compute $\alpha_3(j)$ for $j = 1, 2, 3$ with $y_3 = \text{door}$ using the same recursive formula. Below is an example code snippet for computing forward variables in Python:

```execute-python
import numpy as np

S = [1, 2, 3]

pi = np.array([0.1, 0.8, 0.1])
P = np.array([
    [0.7, 0.3, 0.0],
    [0.2, 0.6, 0.2],
    [0.0, 0.3, 0.7],
])
M = np.array([
    [0.1, 0.9],  # state 1: P(door)=0.1, P(wall)=0.9
    [0.8, 0.2],  # state 2
    [0.1, 0.9],  # state 3
])

# Observation sequence y_{1:3} = (door, wall, door)
obs_to_idx = {"door": 0, "wall": 1}
y_seq = ["door", "wall", "door"]
y_idx = np.array([obs_to_idx[o] for o in y_seq], dtype=int)

# Forward algorithm
n_states = pi.shape[0]
T = len(y_idx)

alpha = np.zeros((T, n_states), dtype=float)

# Base case
alpha[0, :] = pi * M[:, y_idx[0]]

# Recursive case
for t in range(1, T):
    # alpha[t, j] = (sum_i alpha[t-1, i] * P[i, j]) * M[j, y_t]
    alpha[t, :] = (alpha[t - 1, :] @ P) * M[:, y_idx[t]]

# Termination: likelihood
likelihood = alpha[-1, :].sum()

print("Observations:", y_seq)
print("\nalpha table (rows=t, cols=state 1..3):")
print(alpha)
print("\nalpha_1:", alpha[0])
print("alpha_2:", alpha[1])
print("alpha_3:", alpha[2])
print("\nLikelihood p(y_1:T):", likelihood)
```

From the code execute, we get:
$$
\begin{align*}
\alpha_3(1) &= 0.010065, \\
\alpha_3(2) &= 0.09576, \\
\alpha_3(3) &= 0.010065.
\end{align*}
$$

We can now compute the likelihood of the observation sequence following $\eqref{eq:forward_termination}$:
$$
p(y_{1:3}) = \alpha_3(1) + \alpha_3(2) + \alpha_3(3) = 0.11589.
$$

We can format the forward variable matrix as follows:

$$
\alpha = \begin{bmatrix}
\alpha_1(1) & \alpha_1(2) & \alpha_1(3) \\
\alpha_2(1) & \alpha_2(2) & \alpha_2(3) \\
\alpha_3(1) & \alpha_3(2) & \alpha_3(3)
\end{bmatrix} =
\begin{bmatrix}
0.01 & 0.64 & 0.01 \\
0.1215 & 0.078 & 0.1215 \\
0.010065 & 0.09576 & 0.010065
\end{bmatrix}.
$$

</details>

#### Backward Algorithm

Given an observed sequence $y_{1:n}$, we define the **backward variable** $\beta_k(i)$ as the probability of the _future_ observations from time $k+1$ to $n$, conditioned on the state being $i$ at time $k$:
$$
\begin{equation} \label{eq:backward_variable}
\beta_k(i) = p(Y_{k+1:n} = y_{k+1:n} \mid X_k = i).
\end{equation}
$$
The algorithm proceeds recursively:

1. **Base Case** ($k=n$): There are no future observations, so we set:
   $$
   \begin{equation} \label{eq:backward_base_case}
   \beta_n(i) = 1, \quad \forall i \in S.
   \end{equation}
   $$
2. **Recursive Case** ($k < n$): We can express $\beta_k(i)$ in terms of $\beta_{k+1}(j)$:
   $$
    \begin{equation} \label{eq:backward_recursive_case}
    \beta_k(i) = \sum_{j \in S} P_{ij} M_{j, y_{k+1}} \beta_{k+1}(j).
    \end{equation}
    $$
3. **Termination**: The likelihood of the observation sequence can also be computed using the backward variables at time $1$:
   $$
    \begin{equation} \label{eq:backward_termination}
    p(y_{1:n}) = \sum_{i \in S} \pi_i M_{i, y_1} \beta_1(i).
    \end{equation}
    $$

<details><summary>Backward Algorithm Example</summary>

Following the previous HMM example:
$$
\mathcal{O} = \{\text{door}, \text{wall}\}, \quad S = \{1, 2, 3\}, \quad \lambda = (\pi, P, M),
$$
with
$$
\pi = \begin{bmatrix} 0.1 \\ 0.8 \\ 0.1 \end{bmatrix}, \quad P=\left[\begin{array}{lll}
0.7 & 0.3 & 0.0 \\
0.2 & 0.6 & 0.2 \\
0.0 & 0.3 & 0.7
\end{array}\right], \quad M=\left[\begin{array}{ll}
0.1 & 0.9 \\
0.8 & 0.2 \\
0.1 & 0.9
\end{array}\right].
$$
Suppose we observe:
$$
y_{1:3} = (\text{door}, \text{wall}, \text{door}).
$$
We'll compute:
$$
\beta_3(i), \beta_2(i), \beta_1(i) \quad \text{for } i = 1, 2, 3.
$$

We initialize with $k=3$ following $\eqref{eq:backward_base_case}$:
$$
\beta_3(1) = \beta_3(2) = \beta_3(3) = 1.
$$
Next, we compute $\beta_2(i)$ for $i = 1, 2, 3$ with $y_3 = \text{door}$ using $\eqref{eq:backward_recursive_case}$:
$$
\begin{align*}
\beta_2(1) &= P_{11}M_{1,\text{door}}\beta_3(1) + P_{12}M_{2,\text{door}}\beta_3(2) + P_{13}M_{3,\text{door}}\beta_3(3) \\
&= 0.7\cdot 0.1 \cdot 1 + 0.3\cdot 0.8 \cdot 1 + 0.0\cdot 0.1 \cdot 1 = 0.31, \\
\beta_2(2) &= P_{21}M_{1,\text{door}}\beta_3(1) + P_{22}M_{2,\text{door}}\beta_3(2) + P_{23}M_{3,\text{door}}\beta_3(3) \\
&= 0.2\cdot 0.1 \cdot 1 + 0.6\cdot 0.8 \cdot 1 + 0.2\cdot 0.1 \cdot 1 = 0.52, \\
\beta_2(3) &= P_{31}M_{1,\text{door}}\beta_3(1) + P_{32}M_{2,\text{door}}\beta_3(2) + P_{33}M_{3,\text{door}}\beta_3(3) \\
&= 0.0\cdot 0.1 \cdot 1 + 0.3\cdot 0.8 \cdot 1 + 0.7\cdot 0.1 \cdot 1 = 0.31.
\end{align*}
$$
Finally we compute $\beta_1(i)$ for $i = 1, 2, 3$ with $y_2 = \text{wall}$ using the same recursive formula using the following code snippet:

```execute-python
import numpy as np

pi = np.array([0.1, 0.8, 0.1])
P = np.array([
    [0.7, 0.3, 0.0],
    [0.2, 0.6, 0.2],
    [0.0, 0.3, 0.7],
])
M = np.array([
    [0.1, 0.9],
    [0.8, 0.2],
    [0.1, 0.9],
])

obs_to_idx = {"door": 0, "wall": 1}
y_seq = ["door", "wall", "door"]
y_idx = np.array([obs_to_idx[o] for o in y_seq], dtype=int)

n_states = pi.shape[0]
T = len(y_idx)

beta = np.zeros((T, n_states))

# Base case
beta[T-1, :] = 1.0

# Recursion backward
for t in range(T-2, -1, -1):
    for i in range(n_states):
        beta[t, i] = np.sum(P[i, :] * M[:, y_idx[t+1]] * beta[t+1, :])

# Likelihood
likelihood = np.sum(pi * M[:, y_idx[0]] * beta[0, :])

print("beta table (rows=t, cols=state 1..3):")
print(beta)
print("Likelihood:", likelihood)
```

From the code execute, we get:
$$
\begin{align*}
\beta_1(1) &= 0.2265, \\
\beta_1(2) &= 0.174, \\
\beta_1(3) &= 0.2265.
\end{align*}
$$
We can now compute the likelihood of the observation sequence following $\eqref{eq:backward_termination}$:
$$
p(y_{1:3}) = \sum_{i \in S} \pi_i M_{i, y_1} \beta_1(i) = 0.11589,
$$
which matches the likelihood computed from the forward algorithm, confirming the consistency of both methods. The backward variable matrix can be formatted as follows:

$$
\beta = \begin{bmatrix}
\beta_1(1) & \beta_1(2) & \beta_1(3) \\
\beta_2(1) & \beta_2(2) & \beta_2(3) \\
\beta_3(1) & \beta_3(2) & \beta_3(3)
\end{bmatrix} =
\begin{bmatrix}
0.2265 & 0.174 & 0.2265 \\
0.31 & 0.52 & 0.31 \\
1 & 1 & 1
\end{bmatrix}.
$$

</details>

#### Solving Inference Problems

Using the forward variables $\alpha_k(i)$ and backward variables $\beta_k(i)$, we can solve the filtering, smoothing, prediction, and likelihood problems efficiently.

- **Filtering** (online state estimation) $\eqref{eq:hmm_filtering_problem}$:

  The filtering distribution is obtained by normalizing the forward variables:
  $$
  \begin{equation} \label{eq:hmm_filtering_solution}
  p(X_k = i \mid y_{1:k}) = \frac{\alpha_k(i)}{\sum_{j \in S} \alpha_k(j)}.
  \end{equation}
  $$

    <details><summary>Filtering Example</summary>

    We use the same observation sequence as in the forward/backward examples:
    $$
    y_{1:3}=(\text{door},\text{wall},\text{door}).
    $$
    $$
    \alpha = \begin{bmatrix}
        0.01 & 0.64 & 0.01 \\
        0.1215 & 0.078 & 0.1215 \\
        0.010065 & 0.09576 & 0.010065
        \end{bmatrix}.
    $$

    We follow $\eqref{eq:hmm_filtering_solution}$ to compute the filtering distribution at each time step:
    $$
    \begin{align*}
    p(X_1 = i \mid y_{1:1}) &= \frac{\alpha_1(i)}{\sum_{j \in S} \alpha_1(j)} = \frac{\alpha_1(i)}{0.01 + 0.64 + 0.01} = \frac{\alpha_1(i)}{0.66}, \\
    p(X_2 = i \mid y_{1:2}) &= \frac{\alpha_2(i)}{\sum_{j \in S} \alpha_2(j)} = \frac{\alpha_2(i)}{0.1215 + 0.078 + 0.1215} = \frac{\alpha_2(i)}{0.321}, \\
    p(X_3 = i \mid y_{1:3}) &= \frac{\alpha_3(i)}{\sum_{j \in S} \alpha_3(j)} = \frac{\alpha_3(i)}{0.010065 + 0.09576 + 0.010065} = \frac{\alpha_3(i)}{0.11589}.
    \end{align*}
    $$
    Now we can compute the filtering distributions explicitly:
    $$
    \begin{align*}
    p(X_1 = 1 \mid y_{1:1}) &= \frac{0.01}{0.66} \approx 0.0152 & p(X_1 = 2 \mid y_{1:1}) &= \frac{0.64}{0.66} \approx 0.9697 & p(X_1 = 3 \mid y_{1:1}) &= \frac{0.01}{0.66} \approx 0.0152 \\
    p(X_2 = 1 \mid y_{1:2}) &= \frac{0.1215}{0.321} \approx 0.3785 & p(X_2 = 2 \mid y_{1:2}) &= \frac{0.078}{0.321} \approx 0.2430 & p(X_2 = 3 \mid y_{1:2}) &= \frac{0.1215}{0.321} \approx 0.3785 \\
    p(X_3 = 1 \mid y_{1:3}) &= \frac{0.0101}{0.1159} \approx 0.0868 & p(X_3 = 2 \mid y_{1:3}) &= \frac{0.0958}{0.1159} \approx 0.8263 & p(X_3 = 3 \mid y_{1:3}) &= \frac{0.0101}{0.1159} \approx 0.0868
    \end{align*}
    $$
    Summarizing nicely into a table:

    | Time $k$ | $p(X_k = 1 \mid y_{1:k})$ | $p(X_k = 2 \mid y_{1:k})$ | $p(X_k = 3 \mid y_{1:k})$ |
    |-----------|-----------------------------|-----------------------------|-----------------------------|
    | 1         | 0.0152                      | 0.9697                      | 0.0152                      |
    | 2         | 0.37850                     | 0.24299                     | 0.37850                     |
    | 3         | 0.08684                     | 0.82630                     | 0.08684                     |

    </details>

- **Smoothing** (offline state estimation) $\eqref{eq:hmm_smoothing_problem}$:

  Using both past and future observations, the smoothed marginal is:
  $$
  \begin{equation} \label{eq:hmm_smoothing_solution}
  p(X_j = i \mid y_{1:n}) = \frac{\alpha_j(i)\,\beta_j(i)}{\sum_{l \in S} \alpha_j(l)\,\beta_j(l)}, \quad 1 \le j \le n.
  \end{equation}
  $$
  Since $\sum_{l \in S} \alpha_j(l)\beta_j(l) = p(y_{1:n})$, this can also be written as
  $$
  \begin{equation} \label{eq:hmm_smoothing_solution_alternative}
  p(X_j = i \mid y_{1:n}) = \frac{\alpha_j(i)\,\beta_j(i)}{p(y_{1:n})}.
  \end{equation}
  $$

    <details><summary>Smoothing Example</summary>

    We use the same observation sequence as in the forward/backward examples:
    $$
    y_{1:3}=(\text{door},\text{wall},\text{door}).
    $$
    $$
    \alpha = \begin{bmatrix}
        0.01 & 0.64 & 0.01 \\
        0.1215 & 0.078 & 0.1215 \\
        0.010065 & 0.09576 & 0.010065
        \end{bmatrix}, \quad
    \beta = \begin{bmatrix}
        0.2265 & 0.174 & 0.2265 \\
        0.31 & 0.52 & 0.31 \\
        1 & 1 & 1
        \end{bmatrix}.
    $$
    We follow $\eqref{eq:hmm_smoothing_solution_alternative}$ to compute the smoothing distribution at each time step. Note that we have already computed
    $$
    p(y_{1:3}) = \sum_{i \in S} \alpha_3(i) = 0.11589.
    $$
    Now we can compute the smoothing distributions explicitly:
    $$
    \begin{align*}
    p(X_1 = 1 \mid y_{1:3}) &= \frac{0.01 \cdot 0.2265}{0.11589} \approx 0.0195 & p(X_1 = 2 \mid y_{1:3}) &= \frac{0.64 \cdot 0.174}{0.11589} \approx 0.9609 & p(X_1 = 3 \mid y_{1:3}) &= \frac{0.01 \cdot 0.2265}{0.11589} \approx 0.0195 \\
    p(X_2 = 1 \mid y_{1:3}) &= \frac{0.1215 \cdot 0.31}{0.11589} \approx 0.3250 & p(X_2 = 2 \mid y_{1:3}) &= \frac{0.078 \cdot 0.52}{0.11589} \approx 0.3500 & p(X_2 = 3 \mid y_{1:3}) &= \frac{0.1215 \cdot 0.31}{0.11589} \approx 0.3250 \\
    p(X_3 = 1 \mid y_{1:3}) &= \frac{0.0101 \cdot 1}{0.11589} \approx 0.0868 & p(X_3 = 2 \mid y_{1:3}) &= \frac{0.0958 \cdot 1}{0.11589} \approx 0.8263 & p(X_3 = 3 \mid y_{1:3}) &= \frac{0.0101 \cdot 1}{0.11589} \approx 0.0868
    \end{align*}
    $$

    </details>

    <details><summary>Proof of denominator in smoothing solution</summary>

    We want to show:
    $$
    \sum_{l \in S} \alpha_j(l) \beta_j(l)=p\left(y_{1: n}\right)
    $$
    Recall the definitions of $\alpha_j(l)$ $\eqref{eq:forward_variable}$ and $\beta_j(l)$ $\eqref{eq:backward_variable}$:
    $$
    \begin{align*}
    \alpha_j(i) &= p(Y_{1:j} = y_{1:j}, X_j = i), \\
    \beta_j(i) &= p(Y_{j+1:n} = y_{j+1:n} \mid X_j = i).
    \end{align*}
    $$
    We multiply these two terms:
    $$
    \alpha_j(i) \beta_j(i) = p(Y_{1:j} = y_{1:j}, X_j = i) p(Y_{j+1:n} = y_{j+1:n} \mid X_j = i)
    $$
    Since the probability of future observations $y_{j+1:n}$ depends only on the current state $X_j$, we can add past observations $y_{1:j}$ to the conditioning of the second term without changing its value:
    $$
    \alpha_j(i) \beta_j(i) = p(Y_{1:j} = y_{1:j}, X_j = i) p(Y_{j+1:n} = y_{j+1:n} \mid X_j = i, Y_{1:j} = y_{1:j})
    $$
    Now we combine the two terms using the chain rule $\eqref{eq:chain_rule}$:
    $$
    \alpha_j(i) \beta_j(i)  = p(Y_{1:j} = y_{1:j}, X_j = i, Y_{j+1:n} = y_{j+1:n}) = p(Y_{1:n} = y_{1:n}, X_j = i).
    $$
    Now sum over all possible states $i \in S$:
    $$
    \sum_{i \in S} \alpha_j(i) \beta_j(i)=\sum_{i \in S} p\left(X_j=i, Y_{1: n}=y_{1: n}\right)
    $$
    By the law of total probability $\eqref{eq:total_probability}$, we can sum over all states to get the marginal probability of the observation sequence:
    $$
    \sum_{i \in S} \alpha_j(i) \beta_j(i)=p\left(y_{1: n}\right).
    $$

    </details>

- **Prediction** (forecasting future states) $\eqref{eq:hmm_prediction_problem}$:

  First compute the filtering distribution at time $k$, then propagate it forward using the transition matrix. For $j > k$,
  $$
  \begin{equation} \label{eq:hmm_prediction_solution}
  p(X_j = i \mid y_{1:k}) = \sum_{l \in S} (P^{\,j-k})_{l i}\; p(X_k = l \mid y_{1:k}),
  \end{equation}
  $$
  where $P^{\,j-k}$ denotes the $(j-k)$-step transition matrix. In particular, for one-step prediction ($j=k+1$):
  $$
  p(X_{k+1} = i \mid y_{1:k}) = \sum_{l \in S} P_{l i}\; p(X_k = l \mid y_{1:k}).
  $$

- **Likelihood of Observations** $\eqref{eq:hmm_likelihood_problem}$:

  The likelihood of the entire observation sequence can be computed either from the forward variables:
  $$
  \begin{equation} \label{eq:hmm_likelihood_solution_forward}
  p(y_{1:n}) = \sum_{i \in S} \alpha_n(i),
  \end{equation}
  $$
  or from the backward variables:
  $$
  \begin{equation} \label{eq:hmm_likelihood_solution_backward}
  p(y_{1:n}) = \sum_{i \in S} \pi_i\, M_{i, y_1}\, \beta_1(i).
  \end{equation}
  $$

These identities show that once the forward and backward variables are available, filtering, smoothing, prediction, and likelihood evaluation can all be performed efficiently using simple algebraic operations.

#### Viterbi Algorithm

Given an observed sequence $y_{1:n}$, the **decoding** problem is to find the most likely hidden state sequence
$$
\begin{equation} \label{eq:hmm_decoding_problem_viterbi}
x_{1:n}^* = \arg\max_{x_{1:n}} p(X_{1:n} = x_{1:n} \mid y_{1:n}).
\end{equation}
$$
Since $p(y_{1:n})$ is constant w.r.t. $x_{1:n}$, this is equivalent to maximizing the joint:
$$
\begin{equation} \label{eq:hmm_decoding_problem_viterbi_equivalent}
x_{1:n}^* = \arg\max_{x_{1:n}} p(x_{1:n}, y_{1:n}).
\end{equation}
$$
Using the HMM factorization $\eqref{eq:hmm_factorization}$, we can express the joint probability as:
$$
\begin{equation} \label{eq:hmm_decoding_joint_factorization}
p(x_{1:n}, y_{1:n}) = \pi_{x_1}M_{x_1, y_1} \prod_{k=2}^n P_{x_{k-1}, x_k} M_{x_k, y_k}.
\end{equation}
$$
We can solve $\eqref{eq:hmm_decoding_problem_viterbi_equivalent}$ using dynamic programming.

We define the **Viterbi (max-product) variable** $\delta_k(j)$ as the probability of the most _likely_ state path ending in state $j$ at time $k$, together with the observations up to $k$:
$$
\begin{equation} \label{eq:viterbi_variable}
\delta_k(j) = \max_{x_{1:k-1}} p(x_{1:k-1}, X_k = j, y_{1:k}).
\end{equation}
$$
We also store the **backpointer** $\psi_k(j)$, which records which previous state achieves the max:
$$
\begin{equation} \label{eq:viterbi_backpointer}
\psi_k(j) = \arg\max_{i \in S} \left[ \delta_{k-1}(i) P_{i j} \right], \quad k \geq 2.
\end{equation}
$$

1. **Base Case** ($k=1$):
   $$
   \begin{equation} \label{eq:viterbi_base_case}
   \delta_1(j) = \pi_j M_{j, y_1}, \quad \psi_1(j) = 0, \quad \forall j \in S.
   \end{equation}
   $$
2. **Recursive Case** ($k > 1$):
    $$
    \begin{equation} \label{eq:viterbi_recursive_case}
    \delta_k(j) = \left[ \max_{i \in S} \delta_{k-1}(i) P_{i j} \right] M_{j, y_k}, \quad \forall j \in S
    \end{equation}
    $$
    $$
    \begin{equation} \label{eq:viterbi_backpointer_recursive_case}
    \psi_k(j) = \arg\max_{i \in S} \left[ \delta_{k-1}(i) P_{i j} \right], \quad \forall j \in S
    \end{equation}
    $$
3. **Termination**:
   $$
   \begin{equation} \label{eq:viterbi_termination}
   p^*= \max_{j \in S} \delta_n(j), \quad x_n^* = \arg\max_{j \in S} \delta_n(j),
   \end{equation}
   $$
   where $p^*$ is the joint probability of the best path with the observations.
4. **Path Backtracking**: After computing $\delta_n(j)$ and $\psi_k(j)$ for all $k$ and $j$, we can backtrack to find the optimal state sequence:
   $$
   \begin{equation} \label{eq:viterbi_backtracking}
   x_k^*= \psi_{k+1}(x_{k+1}^*), \quad k = n-1, n-2, \dots, 1.
   \end{equation}
   $$

### Robot Environment Interaction

The environment of a robot is a _dynamical system_ that possesses internal _state_. We introduce state first before describing how robots interact with their environment through actions and observations.

#### State

Environments are characterized by _state_, which encapsulates all relevant information about the system at a given time. A state that changes over time is called a _dynamic state_. We denote such state as:
$$
X_t = x_t
$$

Typical states could be:

- robot pose
- configuration of robot actuators
- joint velocity
- location and features of surrounding objects in the environment

#### Environment Interaction

There are two fundamental types of interactions between a robot and its environment:

- The robot can influence the state of its environment through its actuators (control data).
- The robot can gather information about the state through its sensor (measurement data).

**Measurement Data** provides information about a momentary state of the environment. The measurement data collected at time $t$ is denoted as
$$
Z_t = z_t
$$
We assume that the robot always start at an initial state $x_0$, and will make the first measurement at time $t = 1$. Therefore, $z_t$ starts at $t=1$.

**Control Data** allows the robot to influence the state of the environment. The control data applied at time $t$ is denoted as
$$
U_t = u_t
$$
The variable $u_t$ will always correspond to the change of state in the time interval $(t−1;t]$.

#### Modeling Environment Dynamics

Probabilistically, the current state is conditioned on all past states, control inputs, and measurements if we do not assume any preconditions:
$$
p(x_t \mid x_{0:t-1}, z_{1:t-1}, u_{1:t})
$$
However, states typically follow the markov property $\eqref{eq:markov_property}$. In particular, $x_{t−1}$ is a sufficient statistic of all previous controls and measurements up to this point, that is, $u_{1:t−1}$ and $z_{1:t−1}$. Therefore, we can formulate the following conditional independence for modeling the current state, also known as the _state transition probability_.
$$
\begin{equation} \label{eq:state-transition-probability}
p(x_t \mid x_{0:t-1}, z_{1:t-1}, u_{1:t}) = p(x_t \mid x_{t-1}, u_t).
\end{equation}
$$
To model the effect of measurements on the current state, we assume that the measurement $z_t$ only depends on the current state $x_t$, also known as the _measurement probability_.
$$
\begin{equation} \label{eq:measurement-probability}
p(z_t \mid x_{0:t}, z_{1:t-1}, u_{1:t}) = p(z_t \mid x_t).
\end{equation}
$$

Together, the state transition probability and the measurement probability together describe the dynamical stochastic system of the robot and its environment. This probabilistic structure is effectively modeled as a Dynamic Bayesian Network (DBN) (or Hidden Markov Model with control inputs). The graphical model below illustrates these dependencies, showing how the state evolves based on controls and previous states while solely determining the measurements.

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, ->, auto, node distance=2.5cm]

  % --- Nodes ---
  % Row 1: Control Inputs (U) - The new addition compared to HMM
  \node [circle, draw, minimum size=1.2cm] (u1) at (1.5, 1.5) {$u_1$};
  \node [circle, draw, minimum size=1.2cm] (u2) at (4.5, 1.5) {$u_2$};
  \node [circle, draw, minimum size=1.2cm] (udots) at (7.5, 1.5) {$\dots$};
  \node [circle, draw, minimum size=1.2cm] (un) at (10.5, 1.5) {$u_n$};

  % Row 2: Hidden States (X)
  \node [circle, draw, minimum size=1.2cm] (x0) at (-1.5, 0) {$x_0$};
  \node [circle, draw, minimum size=1.2cm] (x1) at (1.5, 0) {$x_1$};
  \node [circle, draw, minimum size=1.2cm] (x2) at (4.5, 0) {$x_2$};
  \node [circle, draw, minimum size=1.2cm] (dots) at (7.5, 0) {$\dots$};
  \node [circle, draw, minimum size=1.2cm] (xn) at (10.5, 0) {$x_n$};

  % Row 3: Measurements (Z)
  \node [circle, draw, minimum size=1.2cm] (z1) at (1.5, -2.5) {$z_1$};
  \node [circle, draw, minimum size=1.2cm] (z2) at (4.5, -2.5) {$z_2$};
  \node [circle, draw, minimum size=1.2cm] (zdots) at (7.5, -2.5) {$\dots$};
  \node [circle, draw, minimum size=1.2cm] (zn) at (10.5, -2.5) {$z_n$};

  % --- Edges ---
  
  % 1. State Transitions (Horizontal)
  \draw (x0) to node {} (x1);
  \draw (x1) to node {} (x2);
  \draw (x2) to node {} (dots);

  \draw (dots) to node {} (xn);

  % 2. Control inputs affecting State (Diagonal/Vertical)
  \draw (u1) to node {} (x1);
  \draw (u2) to node {} (x2);
  \draw (udots) to node {} (dots);
  \draw (un) to node {} (xn);

  % 3. Measurement Model (Vertical)
  \draw (x1) to node {} (z1);
  \draw (x2) to node {} (z2);
    \draw (dots) to node {} (zdots);
  \draw (xn) to node {} (zn);

\end{tikzpicture}
\end{document}
```

#### Belief Distributions

A robot operating in a dynamic environment does not have the luxury of knowing the exact state $x_t$ of the environment at time $t$. Instead, it maintains a _belief distribution_ over all possible states, denoted as:
$$
\begin{equation} \label{eq:belief_distribution}
\text{bel}(x_t) = p(x_t \mid z_{1:t}, u_{1:t}).
\end{equation}
$$
This posterior is the probability distribution over the state $x_t$ at time $t$, conditioned on all past measurements $z_{1:t}$ and all past controls $u_{1:t}$. If we want the belief distribution before taking measurement $z_t$, we denote it as:
$$
\begin{equation} \label{eq:predicted_belief_distribution}
\overline{\text{bel}}(x_t) = p(x_t \mid z_{1:t-1}, u_{1:t}).
\end{equation}
$$
This is known as the _predicted belief distribution_ or _prior belief
distribution_ at time $t$.

#### Bayes Filter

We wish to compute the belief distribution $\eqref{eq:belief_distribution}$ recursively. We first apply Bayes' rule $\eqref{eq:conditioned-bayes}$ to expand the posterior and take out the normalizing constant following $\eqref{eq:bayes_single}$:
$$
\begin{align}
p(x_t \mid z_{1:t}, u_{1:t}) &= \frac{p(z_t \mid x_t, z_{1:t-1}, u_{1:t})p(x_t \mid  z_{1:t-1}, u_{1:t})}{p(z_t \mid  z_{1:t-1}, u_{1:t})} \label{eq:bayes-filter-before-constant} \\
&= \eta \cdot p(z_t \mid x_t, z_{1:t-1}, u_{1:t})p(x_t \mid  z_{1:t-1}, u_{1:t}) \label{eq:bayes-filter-after-constant}.
\end{align}
$$
We then simplify with $\eqref{eq:measurement-probability}$ and $\eqref{eq:predicted_belief_distribution}$:
$$
\begin{equation} \label{eq:bayes-filter-after-simplify}
p(x_t \mid z_{1:t}, u_{1:t}) = \eta \cdot p(z_t \mid x_t) \cdot \overline{\text{bel}}(x_t).
\end{equation}
$$
We can expand the term $\overline{\text{bel}}(x_t)$ with $\eqref{eq:total_probability_conditioned}$ by conditioning on $x_{t -1}$:
$$
\begin{align}
\overline{\text{bel}}(x_t) &= p(x_t \mid z_{1:t-1}, u_{1:t}) \\
&= \sum_{x_{t-1}} p(x_t \mid x_{t - 1}, z_{1:t-1}, u_{1:t})p(x_{t-1} \mid z_{1:t-1}, u_{1:t})
\end{align}
$$
We simply the first term in the summation by using $\eqref{eq:state-transition-probability}$:
$$
\begin{equation} \label{eq:predicted-belief-simplified}
\overline{\text{bel}}(x_t) = \sum_{x_{t-1}} p(x_t \mid x_{t - 1}, u_t)  p(x_{t-1} \mid z_{1:t-1}, u_{1:t}).
\end{equation}
$$
We then observe that the second term in the summation is conditioned on $u_{1:t}$, however $x_{t-1}$ only depends on $u_{1:t-1}$. Therefore, we can simplify it further with $\eqref{eq:belief_distribution}$:
$$
\begin{align}
\overline{\text{bel}}(x_t) &= \sum_{x_{t-1}} p(x_t \mid x_{t - 1}, u_t)  p(x_{t-1} \mid z_{1:t-1}, u_{1:t-1}) \\
&= \sum_{x_{t-1}} p(x_t \mid x_{t - 1}, u_t)  \text{bel}(x_{t-1}). \label{eq:almost-there-with-bayes-filter}
\end{align}
$$
Now we substitute $\eqref{eq:almost-there-with-bayes-filter}$ back into $\eqref{eq:bayes-filter-after-simplify}$ and write it out explicitly:
$$
\begin{equation} \label{bayes-filter-explicit-recursion}
p(x_t \mid z_{1:t}, u_{1:t}) = \eta \cdot p(z_t \mid x_t) \cdot \sum_{x_{t-1}} p(x_t \mid x_{t - 1}, u_t) p(x_{t-1} \mid z_{1:t-1}, u_{1:t-1})
\end{equation}
$$
or in a more compact form:
$$
\begin{equation} \label{bayes-filter-compact}
\text{bel}(x_t) = \eta \cdot p(z_t \mid x_t) \cdot \sum_{x_{t-1}} p(x_t \mid x_{t - 1}, u_t) \text{bel}(x_{t-1}).
\end{equation}
$$
In the case of continuous RVs:
$$
\begin{equation} \label{bayes-filter-compact-continuous-rv}
\text{bel}(x_t) = \eta \cdot f(z_t \mid x_t) \cdot \int f(x_t \mid x_{t - 1}, u_t) \text{bel}(x_{t-1}) dx_{t-1}.
\end{equation}
$$

### IMU Sensors

IMU contains an accelerometer and a gyroscope. The accelerometer measures the linear acceleration of the robot, while the gyroscope measures the angular velocity. We define $a(t)$ as the linear acceleration measurement and $\omega(t)$ as the angular velocity measurement at time $t$. 

#### Estimating Velocity and Position from IMU

From the definition of acceleration, we can derive the velocity and position by integrating the acceleration measurement over time:
$$
\begin{align}
v(t) &= v_0 + \int_{t_0}^t a(\tau) d\tau \label{eq:velocity_from_acceleration} \\
x(t) &= x_0 + \int_{t_0}^t v(\tau) d\tau \label{eq:position_from_velocity}
\end{align}
$$
where $\tau$ is the dummy variable for integration, $v(0) = v_0$ is the initial velocity, and $x(0) = x_0$ is the initial position. For 3D data, we can simply apply the above equations to each dimension of the acceleration measurement to get the velocity and position in 3D space.

In the discrete-time setting, we are given consecutive timestamps $t_i$ and $t_{i+1}$. We use the approximations
$$
\begin{align}
v\left(t_{i+1}\right) &\approx v\left(t_i\right)+a\left(t_i\right)\left(t_{i+1}-t_i\right) \label{eq:discrete-time-acceleration-velocity} \\
x\left(t_{i+1}\right) &\approx x\left(t_i\right)+v\left(t_i\right)\left(t_{i+1}-t_i\right)+\frac{1}{2}a\left(t_i\right)\left(t_{i+1}-t_i\right)^2 \label{eq:discrete-time-velocity-position}
\end{align}
$$
The discrete-time equations are obtained by approximating the continuous dynamics over a small interval $[t_i,t_{i+1}]$, where $\Delta t_i=t_{i+1}-t_i$. Since
$$
a(t)=\frac{dv}{dt},
$$
the change in velocity over a short interval is approximately
$$
v(t_{i+1})-v(t_i)\approx a(t_i)\Delta t_i,
$$
which gives
$$
v(t_{i+1})\approx v(t_i)+a(t_i)\Delta t_i.
$$
For position, we derive the discrete-time update using a Taylor expansion of the continuous position function $\eqref{eq:position_from_velocity}$ about $t_i$:
$$
x(t_{i+1})
=
x(t_i)
+
x'(t_i)(t_{i+1}-t_i)
+
\frac{1}{2}x''(t_i)(t_{i+1}-t_i)^2
+
\mathcal{O}\!\left((t_{i+1}-t_i)^3\right).
$$
From the continuous definitions of velocity and acceleration,
$$
x'(t)=v(t), \qquad x''(t)=a(t).
$$
Substituting these into the Taylor expansion gives
$$
x(t_{i+1})
=
x(t_i)
+
v(t_i)(t_{i+1}-t_i)
+
\frac{1}{2}a(t_i)(t_{i+1}-t_i)^2
+
\mathcal{O}\!\left((t_{i+1}-t_i)^3\right).
$$
Neglecting the higher-order terms yields $\eqref{eq:discrete-time-velocity-position}$.


<details><summary>Example of online recursive estimation of velocity and position from IMU data</summary>

```execute-python
import numpy as np

# Example data: 5 acceleration samples measured at non-uniform timestamps
t = np.array([0.0, 0.8, 1.5, 2.7, 3.1, 4.0])
a = np.array([1.0, 3.0, 8.0, 2.0, -1.0])

# Initial conditions
v0 = 0.0
x0 = 0.0


v_online = [v0]
x_online = [x0]

for i in range(len(a)):
    dt = t[i + 1] - t[i]

    v_next = v_online[-1] + a[i] * dt
    x_next = x_online[-1] + v_online[-1] * dt + 0.5 * a[i] * dt**2

    v_online.append(v_next)
    x_online.append(x_next)

print("Online recursive results:")
print("time\taccel\tvelocity\tposition")
for i in range(len(t)):
    accel_str = f"{a[i]:.1f}" if i < len(a) else "-"
    print(f"{t[i]:.1f}\t{accel_str}\t{v_online[i]:.3f}\t\t{x_online[i]:.3f}")

```

</details>

#### Gyroscope for Orientation Estimation

The accelerometer measurements are expressed in the sensor's local coordinate frame, which is generally not aligned with the global coordinate frame. Denote the accelerometer reading by
$$
f^{\text{body}}(t),
$$
where the superscript $\text{body}$ indicates that the quantity is measured in the sensor's local frame. To express this measurement in the global frame, we use the rotation matrix
$$
R(t)=R_{\text{body}}^{\text{world}}(t),
$$
which maps vectors from the body frame to the world frame. Applying this rotation gives
$$
f^{\text{world}}(t)=R(t)\,f^{\text{body}}(t).
$$
Because an accelerometer measures specific force rather than pure linear acceleration, we must also account for gravity to recover the world-frame acceleration:
$$
a^{\text{world}}(t)=f^{\text{world}}(t)+g^{\text{world}}.
$$
This world-frame acceleration can then be integrated over time to estimate velocity and position. To estimate the rotation matrix $R(t)$, we use the gyroscope measurements $\omega(t)$, which provide the angular velocity of the sensor over time.

Formally, the gyroscope measures the sensor’s angular velocity, expressed in the sensor’s local **body** frame. We denote this by
$$
\omega^{\text {body }}(t)=\left[\begin{array}{c}
\omega_x(t) \\
\omega_y(t) \\
\omega_z(t)
\end{array}\right],
$$
where $\omega_x(t), \omega_y(t), \omega_z(t)$ are the angular velocity components around the sensor’s local $x$, $y$, and $z$ axes respectively. Their units are typically in radians per second (rad/s). 

Over a small interval from $t_i$ to $t_{i+1}$, we update the orientation by applying the small rotation induced by the gyroscope measurement:
$$
R\left(t_{i+1}\right) \approx R\left(t_i\right) \exp \left(\left[\omega^{\text {body }}\left(t_i\right)\right]_{\times}\left(t_{i+1}-t_i\right)\right),
$$
where $[\omega]_{\times}$ is the skew-symmetric matrix associated with the angular velocity vector $\omega$:
$$
[\omega]_{\times}=\left[\begin{array}{ccc}
0 & -\omega_z & \omega_y \\
\omega_z & 0 & -\omega_x \\
-\omega_y & \omega_x & 0
\end{array}\right] .
$$
For very small time intervals, this is often approximated by
$$
R\left(t_{i+1}\right) \approx R\left(t_i\right)\left(I+\left[\omega^{\text {body }}\left(t_i\right)\right]_{\times}\left(t_{i+1}-t_i\right)\right) .
$$

<details><summary>Example of recursive estimation of rotation matrix from gyroscope data</summary>

```execute-python
import numpy as np

# Example data: 5 gyroscope samples measured over 5 time intervals
t = np.array([0.0, 0.8, 1.5, 2.7, 3.1, 4.0])

# omega[i] = [wx, wy, wz] in rad/s, expressed in the body frame
omega = np.array([
    [0.10, 0.00, 0.20],
    [0.00, 0.15, 0.10],
    [0.20, 0.10, 0.00],
    [0.05, 0.00, -0.10],
    [0.00, -0.05, 0.10],
])

def skew(omega_vec):
    """Return the skew-symmetric matrix [omega]_x."""
    wx, wy, wz = omega_vec
    return np.array([
        [0.0, -wz,  wy],
        [wz,  0.0, -wx],
        [-wy, wx,  0.0],
    ])

def exp_so3(omega_vec, dt):
    """
    Compute exp([omega]_x * dt) using Rodrigues' formula.
    This gives the incremental rotation over one time interval.
    """
    theta = np.linalg.norm(omega_vec) * dt
    Omega_dt = skew(omega_vec) * dt

    if theta < 1e-10:
        return np.eye(3) + Omega_dt

    A = np.sin(theta) / theta
    B = (1.0 - np.cos(theta)) / (theta ** 2)
    return np.eye(3) + A * Omega_dt + B * (Omega_dt @ Omega_dt)

# Initial orientation
R0 = np.eye(3)

# Store Rodrigues / matrix exponential update results
R_exp = R0.copy()
R_exp_list = [R_exp.copy()]

# Store first-order approximation results
R_lin = R0.copy()
R_lin_list = [R_lin.copy()]

for i in range(len(omega)):
    dt = t[i + 1] - t[i]
    Omega_dt = skew(omega[i]) * dt

    # Incremental rotation using Rodrigues / exp
    dR_exp = exp_so3(omega[i], dt)

    # First-order approximation: exp(A) ≈ I + A
    dR_lin = np.eye(3) + Omega_dt

    R_exp = R_exp @ dR_exp
    R_lin = R_lin @ dR_lin

    R_exp_list.append(R_exp.copy())
    R_lin_list.append(R_lin.copy())

print("Comparison of orientation estimates:\n")
for i in range(len(t)):
    print(f"t = {t[i]:.1f}")
    print("R using Rodrigues / exp:")
    print(R_exp_list[i])
    print("R using first-order I + [omega]_x dt:")
    print(R_lin_list[i])
    print("Difference norm:", np.linalg.norm(R_exp_list[i] - R_lin_list[i]))
    print()

print("Orthogonality check ||R^T R - I||:\n")
for i in range(len(t)):
    ortho_exp = np.linalg.norm(R_exp_list[i].T @ R_exp_list[i] - np.eye(3))
    ortho_lin = np.linalg.norm(R_lin_list[i].T @ R_lin_list[i] - np.eye(3))
    print(
        f"t = {t[i]:.1f} | "
        f"exp/Rodrigues orthogonality = {ortho_exp:.3e} | "
        f"first-order orthogonality = {ortho_lin:.3e}"
    )
```
The Rodrigues / exponential update stays on the rotation manifold, so the resulting matrix remains a valid rotation matrix up to numerical precision. That is why

$$
R(t)^{\top} R(t) \approx I
$$

stays extremely close to identity, with values around $10^{-16}$, which is essentially machine precision.

By contrast, the first-order approximation

$$
R\left(t_{i+1}\right) \approx R\left(t_i\right)\left(I+\left[\omega\left(t_i\right)\right]_{\times} \Delta t\right)
$$

does not exactly preserve the defining constraints of a rotation matrix. A true rotation matrix must satisfy:

$$
R^{\top} R=I, \quad \operatorname{det}(R)=1 .
$$


The first-order update only approximates the exponential, so after repeated multiplication it gradually drifts away from these constraints. Your orthogonality numbers show exactly that drift.

</details>

<details><summary>Proof of this approximation</summary>

Let $R(t) = R_{\text{body}}^{\text{world}}(t)$ denote the rotation matrix that maps a vector expressed in the body frame to its representation in the world frame. The gyroscope measures the angular velocity of the rigid body in the body frame, which we denote by
$$
\begin{equation}
\omega^{\text{body}}(t) =
\begin{bmatrix}
\omega_x(t) \\
\omega_y(t) \\
\omega_z(t)
\end{bmatrix}.
\label{eq:body_angular_velocity}
\end{equation}
$$
Here, $\omega_x(t)$, $\omega_y(t)$, and $\omega_z(t)$ are the instantaneous angular velocities about the body-frame axes. The gyroscope therefore provides rotational rate, not orientation directly.

To derive the evolution equation for $R(t)$, consider any vector $u^{\text{body}}$ that is fixed in the body frame. Its world-frame representation is
$$
\begin{equation}
u^{\text{world}}(t) = R(t) u^{\text{body}}.
\label{eq:world_vector_from_body_vector}
\end{equation}
$$
Because $u^{\text{body}}$ is constant, all time variation in $u^{\text{world}}(t)$ comes from the rotation matrix.

The defining kinematic fact of rigid-body rotation is that if a rigid body rotates with angular velocity $\omega^{\text{world}}(t)$, then the time derivative of any vector attached to the body is given by
$$
\begin{equation}
\frac{d}{dt} u^{\text{world}}(t)
=
\omega^{\text{world}}(t) \times u^{\text{world}}(t).
\label{eq:rigid_body_kinematic_fact}
\end{equation}
$$
This states that the instantaneous change of a rotating vector is perpendicular to both the angular velocity and the vector itself.

It is convenient to represent the cross product as matrix multiplication. For any $\omega = (\omega_x,\omega_y,\omega_z)^\top$, define the skew-symmetric matrix
$$
\begin{equation}
[\omega]_\times
=
\begin{bmatrix}
0 & -\omega_z & \omega_y \\
\omega_z & 0 & -\omega_x \\
-\omega_y & \omega_x & 0
\end{bmatrix},
\label{eq:skew_symmetric_matrix}
\end{equation}
$$
so that $[\omega]_\times v = \omega \times v$ for every vector $v$.

Differentiating $\eqref{eq:world_vector_from_body_vector}$ with respect to time gives
$$
\begin{equation}
\frac{d}{dt} u^{\text{world}}(t)
=
\left(\frac{d}{dt} R(t)\right) u^{\text{body}},
\label{eq:derivative_of_rotated_vector}
\end{equation}
$$
since $u^{\text{body}}$ is constant. Substituting $\eqref{eq:world_vector_from_body_vector}$ into $\eqref{eq:rigid_body_kinematic_fact}$, we also have
$$
\begin{equation}
\frac{d}{dt} u^{\text{world}}(t)
=
[\omega^{\text{world}}(t)]_\times R(t) u^{\text{body}}.
\label{eq:kinematic_fact_matrix_form}
\end{equation}
$$
Comparing $\eqref{eq:derivative_of_rotated_vector}$ and $\eqref{eq:kinematic_fact_matrix_form}$, we obtain
$$
\begin{equation}
\left(\frac{d}{dt} R(t)\right) u^{\text{body}}
=
[\omega^{\text{world}}(t)]_\times R(t) u^{\text{body}}.
\label{eq:matrix_action_equality}
\end{equation}
$$
Since this holds for every fixed vector $u^{\text{body}}$, the matrices must be equal:
$$
\begin{equation}
\frac{d}{dt} R(t)
=
[\omega^{\text{world}}(t)]_\times R(t).
\label{eq:R_dynamics_world_omega}
\end{equation}
$$

Next, we express this in terms of the gyroscope measurement $\omega^{\text{body}}(t)$. Since $R(t)$ maps body-frame vectors to world-frame vectors, the angular velocity transforms as
$$
\begin{equation}
\omega^{\text{world}}(t) = R(t)\,\omega^{\text{body}}(t).
\label{eq:omega_world_from_body}
\end{equation}
$$
Using the identity
$$
\begin{equation}
[R\omega]_\times = R[\omega]_\times R^\top,
\label{eq:skew_rotation_identity}
\end{equation}
$$
we get
$$
\begin{equation}
[\omega^{\text{world}}(t)]_\times
=
R(t)\,[\omega^{\text{body}}(t)]_\times\,R(t)^\top.
\label{eq:omega_world_skew_from_body}
\end{equation}
$$
Substituting $\eqref{eq:omega_world_skew_from_body}$ into $\eqref{eq:R_dynamics_world_omega}$ yields
$$
\begin{align}
\frac{d}{dt} R(t) &= R(t)\,[\omega^{\text{body}}(t)]_\times\,R(t)^\top R(t) \\
\frac{d}{dt} R(t)  &= R(t)\,[\omega^{\text{body}}(t)]_\times, \label{eq:R_dynamics_body_omega}
\end{align}
$$
since $R(t)^\top R(t) = I$.

Equation $\eqref{eq:R_dynamics_body_omega}$ is the continuous-time kinematic equation relating the gyroscope measurement to the rotation matrix. Given an initial orientation $R(t_0)$, this differential equation determines $R(t)$ for later times.

Over a short interval $[t_i,t_{i+1}]$, if we assume $\omega^{\text{body}}(t)$ is approximately constant and equal to $\omega^{\text{body}}(t_i)$, then $\eqref{eq:R_dynamics_body_omega}$ has the solution
$$
\begin{equation}
R(t_{i+1})
=
R(t_i)\exp\!\left([\omega^{\text{body}}(t_i)]_\times (t_{i+1}-t_i)\right).
\label{eq:rotation_update_matrix_exponential}
\end{equation}
$$
This follows from the standard solution of a linear matrix differential equation with constant coefficient.

Finally, using the Taylor expansion of the matrix exponential,
$$
\begin{equation}
\exp(A) = I + A + \frac{A^2}{2!} + \cdots,
\label{eq:matrix_exponential_taylor}
\end{equation}
$$
we obtain the first-order approximation
$$
\begin{equation}
R(t_{i+1})
\approx
R(t_i)\left(I + [\omega^{\text{body}}(t_i)]_\times (t_{i+1}-t_i)\right),
\label{eq:rotation_update_first_order}
\end{equation}
$$
which is valid when the timestep $t_{i+1}-t_i$ is small.

Therefore, starting from the gyroscope measurement $\omega^{\text{body}}(t)$ and an initial orientation $R(t_0)$, we recover the orientation over time by integrating the kinematic equation $\eqref{eq:R_dynamics_body_omega}$, or equivalently by applying the discrete update $\eqref{eq:rotation_update_matrix_exponential}$ at successive timesteps.

</details>

<details><summary>IMU Visualization</summary>

We provide an example of visualizing the IMU data in 3D space. Note that $\eqref{eq:discrete-time-acceleration-velocity}$ and $\eqref{eq:discrete-time-velocity-position}$ are exact only when acceleration is constant on that interval because of the Taylor expansion. To show this, we first expand $\eqref{eq:discrete-time-acceleration-velocity}$ to include the higher-order terms:
$$
\begin{equation}
v(t_{i+1})=v(t_i)+\dot{v}(t_i) \left(t_{i+1}-t_i\right)+\frac{1}{2} \ddot{v}(t_i) \left( t_{i+1}-t_i\right)^2+\mathcal{O}\left(\left( t_{i+1}-t_i\right)^3\right)
\end{equation}
$$
Since $\dot{v}(t)=a(t)$ and $\ddot{v}(t)=\dot{a}(t)$, we can rewrite this as
$$
\begin{equation}
v(t_{i+1})=v(t_i)+a(t_i) \left(t_{i+1}-t_i\right)+\frac{1}{2} \dot{a}(t_i) \left( t_{i+1}-t_i\right)^2+\mathcal{O}\left(\left( t_{i+1}-t_i\right)^3\right)
\end{equation}
$$
If we have constant acceleration, then $\dot{a}(t_i)=0$ and the higher-order terms vanish, so $\eqref{eq:discrete-time-acceleration-velocity}$ is exact. Similarly, we can expand $\eqref{eq:discrete-time-velocity-position}$ to include the higher-order terms:
$$
\begin{equation}
x(t_{i+1})=x(t_i)+\dot{x}(t_i) \left(t_{i+1}-t_i\right)+\frac{1}{2} \ddot{x}(t_i) \left( t_{i+1}-t_i\right)^2+\mathcal{O}\left(\left( t_{i+1}-t_i\right)^3\right)
\end{equation}
$$
Since $\dot{x}(t)=v(t)$ and $\ddot{x}(t)=a(t)$, we can rewrite this as
$$
\begin{equation}
x(t_{i+1})=x(t_i)+v(t_i) \left(t_{i+1}-t_i\right)+\frac{1}{2} a(t_i) \left( t_{i+1}-t_i\right)^2+\mathcal{O}\left(\left( t_{i+1}-t_i\right)^3\right)
\end{equation}
$$
If we have constant acceleration, then $a(t)=a(t_i)$ for all $t \in [t_i, t_{i+1}]$, so the higher-order terms vanish and $\eqref{eq:discrete-time-velocity-position}$ is exact.

In the visualization below, we have two modes: one with constant acceleration and one with non-constant acceleration. The constant acceleration mode shows a 3D ballistic arc, while the non-constant acceleration mode shows a Lissajous curve. The constant acceleration mode demonstrates that the discrete-time updates perfectly match the continuous-time trajectory, while the non-constant acceleration mode shows that the discrete-time updates deviate from the continuous-time trajectory due to the higher-order terms.


```component

{
    componentName: "IMUMetaSymbolVisualizer"
}

```

</details>

## Kalman Filter

### Linear State Estimation

Let $X \in \mathbb{R}^d$ denote the state of a system, we would like to build an estimator for this state denoted as
$$
\hat{X}.
$$
We would like this estimator to be unbiased, that is:
$$
\mathbb{E}[\hat{X}] = \mathbb{E}[X].
$$
The error in our belief is defined as
$$
\tilde{X} = \hat{X} - X.
$$
The error is zero-mean since the estimator is unbiased:
$$
\mathbb{E}[\tilde{X}] = 0, \quad \mathrm{Cov}(\tilde{X}) = \Sigma_{\tilde{X}}.
$$
Suppose we have two independent unbiased estimators $\hat{X}_1$ and $\hat{X}_2$ with error covariances $\Sigma_{\tilde{X}_1}$ and $\Sigma_{\tilde{X}_2}$ respectively. We would like to combine the two to obtain a better estimate of what the state could be. Our goal is now:
$$
\hat{X} = \mathrm{fun}(\hat{X}_1, \hat{X}_2),
$$
which has the best error covariance $\mathrm{tr}(\Sigma_{\tilde{X}})$.

#### One-dimensional Gaussian Random Variables

Suppose $\hat{X}_1, \hat{X}_2 \in \mathbb{R}$ are Gaussian random variables with means $\mu_1, \mu_2$ and variances $\sigma_1^2, \sigma_2^2$ respectively. Assume both are unbiased estimators of $X \in \mathbb{R}$, we can linearly combine them as follows:
$$
\begin{equation} \label{eq:linear_combination_1d}
\hat{X} = k_1 \hat{X}_1 + k_2 \hat{X}_2,
\end{equation}
$$
where $k_1, k_2 \in \mathbb{R}$ are the weights for the two estimators. Since we want $\hat{X}$ to be an unbiased estimator of $X$ (i.e $\mathbb{E}[\hat{X}] = \mathbb{E}[X]$), we can derive the following constraint on the weights:
$$
\begin{align}
\mathbb{E}[\hat{X}] &= \mathbb{E}[k_1 \hat{X}_1 + k_2 \hat{X}_2] \\
&= k_1 \mathbb{E}[\hat{X}_1] + k_2 \mathbb{E}[\hat{X}_2] \\
&= k_1 \mathbb{E}[X] + k_2 \mathbb{E}[X]  = \mathbb{E}[X], \quad \text{since } \mathbb{E}[\hat{X}_1] = \mathbb{E}[\hat{X}_2] = \mathbb{E}[X] \\
&\implies k_1 + k_2 = 1. \label{eq:weight_constraint_1d}
\end{align}
$$
The variance of $\hat{X}$ is:
$$
\begin{align}
\mathrm{Var}(\hat{X}) &= \mathrm{Var}(k_1 \hat{X}_1 + k_2 \hat{X}_2) \\
&= k_1^2 \mathrm{Var}(\hat{X}_1) + k_2^2 \mathrm{Var}(\hat{X}_2), \quad \text{since } \hat{X}_1, \hat{X}_2 \text{ are independent} \\
&= k_1^2 \sigma_1^2 + k_2^2 \sigma_2^2 \\
&= k_1^2 \sigma_1^2 + (1-k_1)^2 \sigma_2^2 \label{eq:variance_linear_combination_1d}
\end{align}
$$
Suppose we set an objective for the new estimator to have the smallest variance among all linear combinations of $\hat{X}_1$ and $\hat{X}_2$. The optimal weight $k_1^*$ that minimizes the variance can be found by taking the derivative of $\eqref{eq:variance_linear_combination_1d}$ w.r.t. $k_1$ and setting it to zero:
$$
\begin{align}
\frac{d}{dk_1} \left( k_1^2 \sigma_1^2 + (1-k_1)^2 \sigma_2^2 \right) &= 0 \\
2 k_1 \sigma_1^2 - 2 (1-k_1) \sigma_2^2 &= 0
\end{align}
$$
Soving for $k_1$ gives us the optimal weight:
$$
\begin{equation} \label{eq:optimal_weight_1d}
k_1^*= \frac{\sigma_2^2}{\sigma_1^2 + \sigma_2^2}, \quad k_2^* = 1 - k_1^* = \frac{\sigma_1^2}{\sigma_1^2 + \sigma_2^2}.
\end{equation}
$$
Now we get the final estimator by substituting the optimal weights back into $\eqref{eq:linear_combination_1d}$:
$$
\begin{equation} \label{eq:final_estimator_1d}
\hat{X} = \frac{\sigma_2^2}{\sigma_1^2 + \sigma_2^2} \hat{X}_1 + \frac{\sigma_1^2}{\sigma_1^2 + \sigma_2^2} \hat{X}_2.
\end{equation}
$$
This is an unbiased estimator of $X$ with the smallest variance among all linear combinations of $\hat{X}_1$ and $\hat{X}_2$. The variance of this optimal estimator is:
$$
\begin{equation} \label{eq:optimal_variance_1d}
\mathrm{Var}(\hat{X}) = \frac{\sigma_1^2 \sigma_2^2}{\sigma_1^2 + \sigma_2^2}.
\end{equation}
$$

#### Multi-dimensional Gaussian Random Variables

Now we consider the case where $\hat{X}_1, \hat{X}_2 \in \mathbb{R}^d$ are Gaussian random variables with means $\mu_1, \mu_2$ and covariance matrices $\Sigma_1, \Sigma_2$ respectively. Assume both are unbiased estimators of $X \in \mathbb{R}^d$, we can linearly combine them as follows:
$$
\begin{equation} \label{eq:linear_combination_multi_d}
\hat{X} = K_1 \hat{X}_1 + K_2 \hat{X}_2,
\end{equation}
$$
where $K_1, K_2 \in \mathbb{R}^{d \times d}$ are the weight matrices for the two estimators. Since we want $\hat{X}$ to be an unbiased estimator of $X$ (i.e $\mathbb{E}[\hat{X}] = \mathbb{E}[X]$), we can derive the following constraint on the weight matrices:
$$
\begin{align}
\mathbb{E}[\hat{X}] &= \mathbb{E}[K_1 \hat{X}_1 + K_2 \hat{X}_2] \\
&= K_1 \mathbb{E}[\hat{X}_1] + K_2 \mathbb{E}[\hat{X}_2] \\
&= K_1 \mathbb{E}[X] + K_2 \mathbb{E}[X]  = (K_1 + K_2) \mathbb{E}[X] \\
&\implies K_1 + K_2 = I. \label{eq:weight_constraint_multi_d}
\end{align}
$$
By using $\eqref{eq:gaussian_linear_transform}$ and $\eqref{eq:covariance_addition_independent}$, we find the covariance of $\hat{X}$:
$$
\begin{align}
\mathrm{Cov}(\hat{X}) &= \mathrm{Cov}(K_1 \hat{X}_1 + K_2 \hat{X}_2) \\
&= K_1 \Sigma_1 K_1^T + K_2 \Sigma_2 K_2^T \\
&= K_1 \Sigma_1 K_1^T + (I-K_1) \Sigma_2 (I-K_1)^T \label{eq:covariance_linear_combination_multi_d}
\end{align}
$$
Unlike the one-dimensional case, the covariance of $\hat{X}$ is a matrix, and we cannot directly compare two covariance matrices to determine which one is smaller. Instead, we can use the trace of the covariance matrix as a scalar measure of the overall uncertainty in our estimator. Therefore, our objective is to minimize $\mathrm{tr}(\mathrm{Cov}(\hat{X}))$. Note that there are other ways to compare covariance matrices, such as using the determinant or eigenvalues.

We can minimize the trace of the covariance matrix by taking the derivative w.r.t. $K_1$ and setting it to zero. We can use the following identity for the partial derivative of a matrix product:
$$
\begin{equation} \label{eq:matrix_product_derivative_identity}
\frac{\partial}{\partial A} \mathrm{tr}(ABA^T) = 2AB, \quad \text{if } B \text{ is symmetric}.
\end{equation}
$$
Therefore, we have:
$$
\begin{align}
\frac{\partial}{\partial K_1} \mathrm{tr}(\mathrm{Cov}(\hat{X})) &= \frac{\partial}{\partial K_1} \mathrm{tr}(K_1 \Sigma_1 K_1^T + (I-K_1) \Sigma_2 (I-K_1)^T) \\
&= 2 K_1 \Sigma_1 - 2 (I-K_1) \Sigma_2 = 0, \quad \text{since } \mathrm{tr}(A+B) = \mathrm{tr}(A) + \mathrm{tr}(B) \\
&=  K_1 \Sigma_1 -  (I-K_1) \Sigma_2  = 0\\
&\implies K_1 = \Sigma_2 (\Sigma_1 + \Sigma_2)^{-1}, \quad K_2 = I - K_1 = \Sigma_1 (\Sigma_1 + \Sigma_2)^{-1}. \label{eq:optimal_weight_multi_d}
\end{align}
$$
Now we get the final estimator by substituting the optimal weights back into $\eqref{eq:linear_combination_multi_d}$:
$$
\begin{equation} \label{eq:final_estimator_multi_d}
\hat{X} = \Sigma_2 (\Sigma_1 + \Sigma_2)^{-1} \hat{X}_1 + \Sigma_1 (\Sigma_1 + \Sigma_2)^{-1} \hat{X}_2.
\end{equation}
$$

### Kalman Gain

Now, suppose we have a sensor that gives us observations of the state. We consider a special type of sensor that gives observations
$$
\begin{equation} \label{eq:linear_observation_model}
Y = CX + \nu, \quad, Y \in \mathbb{R}^p,
\end{equation}
$$
which is a linear function of the true state $X \in \mathbb{R}^d$ with the matrix $C \in \mathbb{R}^{p \times d}$ being something that is unique to the particular sensor. This observation is corrupted by noise
$$
\nu \sim \mathcal{N}(0, Q), \quad Q \in \mathbb{R}^{p \times p},
$$
which is zero-mean Gaussian with covariance $Q$. Note that the dimensionality of the observation $Y$ can be different from that of the state $X$. Also note that $Y$ is a random variable that estimates $X$, but $X$ is not a random variable, it is a fixed but unknown value that we want to estimate. Therefore, we ahve
$$
\begin{equation} \label{eq:observation_expectation_and_covariance}
\mathbb{E}[Y] = CX, \quad \mathrm{Cov}(Y) = \mathrm{Cov}(\nu) = Q.
\end{equation}
$$

We want to solve the following problem: given an existing unbiased estimator $\hat{X}'$ of the state $X$ and a new observation $Y$, we want to combine them to get a better estimator $\hat{X}$ that minimizes variance. We will use a lienar combination
$$
\begin{equation} \label{eq:linear_combination_observation}
\hat{X} = K' \hat{X}' + KY,
\end{equation}
$$
where $K' \in \mathbb{R}^{d \times d}$ and $K \in \mathbb{R}^{d \times p}$ are the weight matrices for the existing estimator and the new observation respectively. 

We want the new estimator $\hat{X}$ to be unbiased, that is $\mathbb{E}[\hat{X}] = X$ (note that $X$ is not a random variable, it is a fixed but unknown value).
$$
\begin{align}
\mathbb{E}[\hat{X}] &= \mathbb{E}[K' \hat{X}' + KY] \\
&= K' X + K\mathbb{E}[Y] \quad \text{since } \hat{X}' \text{ is an unbiased estimator of } X \\
&= K' X + KCX \quad \text{by } \eqref{eq:observation_expectation_and_covariance} \\
&= \left(K' + KC\right) X \\
&= X \quad \text{since we want } \hat{X} \text{ to be an unbiased estimator of } X \\
&\implies I = K' + KC. \label{eq:unbiased_constraint_observation} \\
&\implies \hat{X} = \left(I - KC\right) \hat{X}' + KY. \label{eq:linear_combination_observation_unbiased} \\
&\implies \hat{X} = \hat{X}' + K\left(Y - C\hat{X}'\right) \label{eq:linear_combination_observation_innovation_form}
\end{align}
$$
The old estimator $\hat{X}'$ gets an additive term $K(Y - C\hat{X}')$ as given in $\eqref{eq:linear_combination_observation_innovation_form}$. We call this term
$$
\begin{equation} \label{eq:innovation}
\text{innovation} = Y - C\hat{X}',
\end{equation}
$$
which measures the discrepancy between the new observation $Y$ and the prediction of the observation based on the old estimator $C\hat{X}'$. We also assume that $\hat{X}'$ and $Y$ are independent, which means that the error in the old estimator is independent of the new observation. Following the same procedure as in the previous sections, we can derive the optimal weight matrix $K$ that minimizes the trace of the covariance of $\hat{X}$. First, we derive the covariance of $\hat{X}$ from the form in $\eqref{eq:linear_combination_observation_unbiased}$:
$$
\begin{equation} \label{eq:covariance_observation}
\Sigma_{\hat{X}} = \left(I - KC\right) \Sigma_{\hat{X}'} \left(I - KC\right)^T + KQK^T.
\end{equation}
$$
We optimize the trace of $\Sigma_{\hat{X}}$ by taking the derivative w.r.t. $K$ and setting it to zero:
$$
\begin{align}
\frac{\partial}{\partial K} \mathrm{tr}\left(\Sigma_{\hat{X}}\right) &= \frac{\partial}{\partial K} \mathrm{tr}\left(\left(I - KC\right) \Sigma_{\hat{X}'} \left(I - KC\right)^T + KQK^T\right) \\
0 &= -2 \left( I - KC \right) \Sigma_{\hat{X}'} C^T + 2 KQ \\
\implies \Sigma_{\hat{X}'} C^T &= K \left( C \Sigma_{\hat{X}'} C^T + Q \right) \\
\implies K &= \Sigma_{\hat{X}'} C^T \left(C \Sigma_{\hat{X}'} C^T + Q\right)^{-1}. \label{eq:optimal_weight_observation}
\end{align}
$$
The matrix $K$ is known as the **Kalman gain**. 

Now we can substitute the optimal Kalman gain back into $\eqref{eq:linear_combination_observation_innovation_form}$ to get the final estimator:
$$
\begin{equation} \label{eq:final_estimator_observation}
\hat{X} = \hat{X}' + \Sigma_{\hat{X}'} C^T \left(C \Sigma_{\hat{X}'} C^T + Q\right)^{-1} \left(Y - C\hat{X}'\right).
\end{equation}
$$
We can also derive the covariance of this optimal estimator by substituting the optimal Kalman gain back into $\eqref{eq:covariance_observation}$:
$$
\begin{equation}\label{eq:optimal_covariance_observation}
\begin{aligned}
\Sigma_{\hat{X}}
&= \left(I - KC\right) \Sigma_{\hat{X}'} \left(I - KC\right)^T + KQK^T \\
&= \left( \Sigma_{\hat{X}'}^{-1} + C^T Q^{-1} C \right)^{-1}.
\end{aligned}
\end{equation}
$$
Another way of expressing the Kalman gain is:
$$
\begin{align}
\Sigma_{\hat{X}}^{-1} &= \Sigma_{\hat{X}'}^{-1} + C^T Q^{-1} C \\
K &= \Sigma_{\hat{X}} C^T Q^{-1} \label{eq:kalman_gain_alternative_expression} \\
\hat{X} &= \hat{X}' + \Sigma_{\hat{X}} C^T Q^{-1} \left(Y - C\hat{X}'\right) \label{eq:final_estimator_observation_alternative_expression}
\end{align}
$$

### Linear and Nonlinear Dynamical Systems

In many problems, we care about how the **state** of a system evolves over time. We can model the state evolution as a dynamical system. 

A **continuous-time signal** is a function of real time:
$$
y: \mathbb{R} \rightarrow \mathbb{R}, \quad t \mapsto y(t) .
$$
A **discrete-time signal** is a function defined only at integer time steps:
$$
y: \mathbb{Z} \rightarrow \mathbb{R}, \quad k \mapsto y_k
$$

A **dynamical system** is simply a system that takes a control input $u(t)$ which changes the state of the system $x(t)$ over time. A system is linear if it satisfies superposition:

If
$$
u_1 \mapsto y_1, \quad u_2 \mapsto y_2,
$$
then for any scalars $\alpha_1, \alpha_2 \in \mathbb{R}$, we have
$$
\alpha_1 u_1 + \alpha_2 u_2 \mapsto \alpha_1 y_1 + \alpha_2 y_2.
$$

For example, suppose a mass move along a line. Let
- $z(t)$: position
- $u(t)$: applied force
- $m$: mass
- $c$: damping coefficient
- $k$: string constant
The equation of motion is 
$$
m \ddot{z}(t) + c \dot{z}(t) + k z(t) = u(t),
$$
which is a second-order linear dynamical system. We can rewrite this as a first-order system by defining the state variables
$$
z_1(t) = z(t), \quad z_2(t) = \dot{z}(t).
$$
We can clearly see that $\dot{z}_1(t) = z_2(t)$, and from the original equation of motion, we have
$$
\dot{z}_2(t)=-\frac{k}{m} z_1(t)-\frac{c}{m} z_2(t)+\frac{1}{m} u(t).
$$
We define the state vector to be
$$
x(t) = \begin{bmatrix}z_1(t) \\ z_2(t) \end{bmatrix},
$$
then we can write the system dynamics in matrix form as
$$
\dot{x}(t)=\begin{bmatrix}\dot{z}_1(t) \\ \dot{z}_2(t) \end{bmatrix} = 
\left[\begin{array}{cc}
0 & 1 \\
-\frac{k}{m} & -\frac{c}{m}
\end{array}\right] x(t)+\left[\begin{array}{c}
0 \\
\frac{1}{m}
\end{array}\right] u(t) .
$$

We can now model a robot system:
- $x(t) \in \mathbb{R}^d$: state of the robot
- $u(t) \in \mathbb{R}^m$: control input to the robot
- $y(t) \in \mathbb{R}^p$: observation of the robot state
The robot dynamics can be modeled as a linear dynamical system:
$$
\begin{equation} \label{eq:linear_dynamical_system}
\begin{aligned}
\dot{x}(t) &= A x(t) + B u(t) \\
y(t) &= C x(t) + D u(t) 
\end{aligned}
\end{equation}
$$
where 
- $A \in \mathbb{R}^{d \times d}$ is the state transition matrix
- $B \in \mathbb{R}^{d \times m}$ is the control input matrix
- $C \in \mathbb{R}^{p \times d}$ is the sensor's mapping from state to observation
- $D \in \mathbb{R}^{p \times m}$ is the sensor's mapping from control input to observation (often not present in many systems)

In the case of nonlinear dynamical systems, the dynamics can be expressed as
$$
\begin{equation} \label{eq:nonlinear_dynamical_system}
\begin{aligned}
\dot{x}(t) &= f(x(t), u(t)) \\
y(t) &= g(x(t), u(t))
\end{aligned}
\end{equation}
$$
where
- $f: \mathbb{R}^d \times \mathbb{R}^m \to \mathbb{R}^d$ is the state transition function
- $g: \mathbb{R}^d \times \mathbb{R}^m \to \mathbb{R}^p$ is the observation function, and it could ignore the control input $u(t)$ and only depend on the state $x(t)$.

### HMMs and MDPs

Markov Decision Processes (MDPs) models
$$
\begin{aligned}
x_{k+1} &\sim p(x_{k+1} \mid x_k, u_k) \\
y_k &\sim p(y_k \mid x_k)
\end{aligned}
$$
This can be alternatively called a **stochastic dynamical system** modeled as the following for nonlinear dynamics:
$$
\begin{aligned}
x_{k+1} &= f(x_k, u_k) + \epsilon_k \\
y_k &= g(x_k) + \nu_k
\end{aligned}
$$
Or in the linear case:
$$
\begin{aligned}
x_{k+1} &= A x_k + B u_k + \epsilon_k \\
y_k &= C x_k + \nu_k
\end{aligned}
$$
where $\epsilon_k$ and $\nu_k$ are zero-mean Gaussian noise:
$$
\epsilon_k \sim \mathcal{N}(0, R), \quad \nu_k \sim \mathcal{N}(0, Q)
$$

### Kalman Filter
Consider a linear dynamical system:
$$
\begin{equation} \label{eq:kalman_filter_dynamical_system}
\begin{aligned}
x_{k+1} &= A x_k + B u_k + \epsilon_k \\
y_k &= C x_k + \nu_k
\end{aligned}
\end{equation}
$$
with noise vectors
$$
\begin{aligned}
\epsilon_k &\sim \mathcal{N}(0, R), \quad R \in \mathbb{R}^{d \times d} \\
\nu_k &\sim \mathcal{N}(0, Q), \quad Q \in \mathbb{R}^{p \times p}
\end{aligned}
$$
Our goal is to compute the best estimate of the state after multiple observations by solving the filtering problem $\eqref{eq:hmm_filtering_problem}$.

Since all operations are linear and all noise is Gaussian, if we assume the initial state $x_0$ is Gaussian, then the state at any time step $k$ will also be Gaussian. We denote the filtering problem solution at time step $k$ as
$$
\begin{equation} \label{eq:kalman_filter_estimate}
\hat{x}_{k|k} \sim \mathrm{P}(x_k \mid y_{1:k}) = \mathcal{N}(\mu_{k|k}, \Sigma_{k|k})
\end{equation}
$$
where the subscript $k|k$ denotes that this is the estimate of $x_k$ given observations up to time step $k$. We assume to have the initial state estimates:
$$
\hat{x}_{0|0} \sim \mathcal{N}(\mu_{0|0}, \Sigma_{0|0}),
$$

#### Propagation Step
Suppose we have estimate $\hat{x}_{k|k}$ , we can use the prediction problem $\eqref{eq:hmm_prediction_problem}$ to compute the estimate of the state at time $k+1$ given observations up to time step $k$:
$$
\begin{equation} \label{eq:kalman_filter_prediction}
\hat{x}_{k+1|k} \sim \mathrm{P}(x_{k+1} \mid y_{1:k}) = \mathcal{N}(\mu_{k+1|k}, \Sigma_{k+1|k})
\end{equation}
$$
The dynamics of the system is given by $\eqref{eq:kalman_filter_dynamical_system}$:
$$
\begin{equation} \label{eq:kalman_filter_dynamics_part_1}
\hat{x}_{k+1|k} = A \hat{x}_{k|k} + B u_k + \epsilon_k
\end{equation}
$$
We can now find the Gaussian parameters of $\hat{x}_{k+1|k}$. First we find the mean:
$$
\begin{align}
\mu_{k+1|k} &= \mathbb{E}\left[ \hat{x}_{k+1|k} \right] \\
&= \mathbb{E}\left[ A \hat{x}_{k|k} + B u_k + \epsilon_k \right] \\
&= A \mu_{k|k} + B u_k \label{eq:kalman_filter_prediction_mean}
\end{align}
$$
Next we find the covariance:
$$
\begin{align}
\Sigma_{k+1|k} &= \mathrm{Cov}\left( \hat{x}_{k+1|k} \right) \\
&= \mathrm{Cov}\left( A \hat{x}_{k|k} + B u_k + \epsilon_k \right) \\
&= A \Sigma_{k|k} A^\top + R \label{eq:kalman_filter_prediction_covariance}
\end{align}
$$

#### Update Step
Now that we have a new estimate of the state $\hat{x}_{k+1|k}$, we can use the new observation $y_{k+1}$ to update our estimate of the state at time step $k+1$. The dynamics of the system is given by $\eqref{eq:kalman_filter_dynamical_system}$:
$$
\begin{equation} \label{eq:kalman_filter_dynamics_part_2}
y_{k+1} = C x_{k+1} + \nu_{k+1}
\end{equation}
$$
We first compute the Kalman gain following $\eqref{eq:optimal_weight_observation}$:
$$
\begin{equation} \label{eq:kalman_gain_kalman_filter}
K_{k+1} = \Sigma_{k+1|k} C^\top \left(C \Sigma_{k+1|k} C^\top + Q\right)^{-1}.
\end{equation}
$$
Then we can update our state estimate using the new observation following $\eqref{eq:linear_combination_observation_innovation_form}$:
$$
\begin{equation} \label{eq:kalman_filter_update}
\hat{x}_{k+1|k+1} = \hat{x}_{k+1|k} + K_{k+1} \left(y_{k+1} - C \hat{x}_{k+1|k}\right).
\end{equation}
$$
We can now find the Gaussian parameters of $\hat{x}_{k+1|k+1}$. First we find the mean:
$$
\begin{align}
\mu_{k+1|k+1} &= \mathbb{E}\left[ \hat{x}_{k+1|k+1} \right] \\
&= \mathbb{E}\left[ \hat{x}_{k+1|k} + K_{k+1} \left(y_{k+1} - C \hat{x}_{k+1|k}\right) \right] \\
&= \mu_{k+1|k} + K_{k+1} \left( y_{k+1} - C \mu_{k+1|k} \right) \\
\end{align}
$$
Next we find the covariance following $\eqref{eq:optimal_covariance_observation}$:
$$
\begin{align}
\Sigma_{k+1|k+1} &= \left(I - K_{k+1} C \right) \Sigma_{k+1|k} \label{eq:kalman_filter_update_covariance} \\
&= \left(I - K_{k+1} C \right) \Sigma_{k+1|k} \left(I - K_{k+1} C \right)^\top + K_{k+1} Q K_{k+1}^\top \label{eq:kalman_filter_update_covariance_alternative} \\
&= \left( \Sigma_{k+1|k}^{-1} + C^\top Q^{-1} C \right)^{-1} \label{eq:kalman_filter_update_covariance_final}
\end{align}
$$
All three expressions for the covariance of the updated state estimate are equivalent. We then repeat the propagation step and update step for each time step to get the state estimates at all time steps.

### Extended Kalman Filter (EKF)

The Extended Kalman Filter (EKF) is an extension of the standard Kalman Filter that can handle nonlinear systems. It linearizes the nonlinear functions around the current estimate and applies the standard Kalman Filter equations to the linearized system.

Consider the following nonlinear dynamical system:
$$
\begin{equation} \label{eq:ekf_dynamical_system}
\begin{aligned}
x_{k+1} &= f(x_k, u_k) + \epsilon_k \\
y_k &= g(x_k) + \nu_k 
\end{aligned}
\end{equation}
$$
with
$$
\begin{aligned}
&x_k \in \mathbb{R}^d, \quad u_k \in \mathbb{R}^m, \quad y_k \in \mathbb{R}^p \\
&\epsilon_k \sim \mathcal{N}(0, R), \quad R \in \mathbb{R}^{d \times d}, \quad \nu_k \sim \mathcal{N}(0, Q), \quad Q \in \mathbb{R}^{p \times p} \\
&f: \mathbb{R}^d \times \mathbb{R}^m \to \mathbb{R}^d, \quad g: \mathbb{R}^d \to \mathbb{R}^p
\end{aligned}
$$
We again assume to have Gaussian initial state estimates:
$$
\hat{x}_{0|0} \sim \mathcal{N}(\mu_{0|0}, \Sigma_{0|0}).
$$

#### Propagation Step

We will linearize the dynamics equation around the mean of the previous state estimate $\mu_{k|k}$:
$$
\begin{align}
\hat{x}_{k+1|k} &= f(\hat{x}_{k|k}, u_k) + \epsilon_k \\
&\approx f(\mu_{k|k}, u_k) + \frac{\partial f}{\partial x}\bigg|_{x = \mu_{k|k}} (\hat{x}_{k|k} - \mu_{k|k}) + \epsilon_k 
\end{align}
$$
Since $u_k$ is assumed to be a known deterministic control input, we treat it as fixed during linearization. Thus we linearize $f\left(x_k, u_k\right)$ only with respect to the state variable $x_k$, around $x_k=\mu_{k \mid k}$. Formally, the expansion point is $\left(\mu_{k \mid k}, u_k\right)$, but the first-order term in $u$ vanishes because $u_k-u_k=0$. If we instead modeled the control as uncertain and expanded around a nominal control $\bar{u}_k$, then an additional Jacobian term with respect to the control input would appear.

We denote the Jacobian of $f$ w.r.t. $x$ at the point $\mu_{k|k}$ as
$$
\begin{equation} \label{eq:jacobian_f}
A_k = \frac{\partial f}{\partial x}\bigg|_{x = \mu_{k|k}}, \quad A_k \in \mathbb{R}^{d \times d}.
\end{equation}
$$
Then we can write the linearized dynamics as
$$
\begin{equation} \label{eq:ekf_linearized_dynamics}
\hat{x}_{k+1|k} \approx f(\mu_{k|k}, u_k) + A_k (\hat{x}_{k|k} - \mu_{k|k}) + \epsilon_k.
\end{equation}
$$
We can now find the Gaussian parameters of the predicted state estimate $\hat{x}_{k+1|k}$. First we find the mean:
$$
\begin{align}
\mu_{k+1|k} &= \mathbb{E}\left[ \hat{x}_{k+1|k} \right] \\
&= \mathbb{E}\left[ f(\mu_{k|k}, u_k) + A_k (\hat{x}_{k|k} - \mu_{k|k}) + \epsilon_k \right] \\
&= \mathbb{E} \left[ f(\mu_{k|k}, u_k) \right] + A_k \mathbb{E} \left[ \hat{x}_{k|k} - \mu_{k|k} \right] + \mathbb{E} \left[ \epsilon_k \right] \\
&= f(\mu_{k|k}, u_k) \label{eq:ekf_prediction_mean}
\end{align}
$$
Next we find the covariance:
$$
\begin{align}
\Sigma_{k+1|k} &= \mathrm{Cov}\left( \hat{x}_{k+1|k} \right) \label{eq:ekf_prediction_covariance_initial} \\
&= \mathrm{Cov}\left( f(\mu_{k|k}, u_k) + A_k (\hat{x}_{k|k} - \mu_{k|k}) + \epsilon_k \right) \\
&= A_k \Sigma_{k|k} A_k^\top + R \label{eq:ekf_prediction_covariance}
\end{align}
$$

#### Update Step

We will linearize the observation equation around the mean of the predicted state estimate $\mu_{k+1|k}$:
$$
\begin{align}
y_{k+1} &= g(x_{k+1}) + \nu_{k+1} \\
&\approx g(\mu_{k+1|k}) + \frac{\partial g}{\partial x}\bigg|_{x = \mu_{k+1|k}} (x_{k+1} - \mu_{k+1|k}) + \nu_{k+1}
\end{align}
$$
We denote the Jacobian of $g$ w.r.t. $x$ at the point $\mu_{k+1|k}$ as
$$
\begin{equation} \label{eq:jacobian_g}
C_{k+1} = \frac{\partial g}{\partial x}\bigg|_{x = \mu_{k+1|k}}, \quad C_{k+1} \in \mathbb{R}^{p \times d}.
\end{equation}
$$
Then we can write the linearized observation equation as
$$
\begin{equation} \label{eq:ekf_linearized_observation}
y_{k+1} \approx g(\mu_{k+1|k}) + C_{k+1} (x_{k+1} - \mu_{k+1|k}) + \nu_{k+1}.
\end{equation}
$$
Suppose we have a fake observation $y_{k+1}'$ that is a transformed version of the actual observation $y_{k+1}$. We rearrange $\eqref{eq:ekf_linearized_observation}$ to get
$$
\begin{equation} \label{eq:fake_observation}
y_{k+1}' = y_{k+1} - g(\mu_{k+1|k}) + C_{k+1} \mu_{k+1|k} \approx C_{k+1} x_{k+1} + \nu_{k+1}
\end{equation}
$$
$y_{k+1}'$ is a linear function of the state $x_{k+1}$ so we can therefore use the Kalman gain formula $\eqref{eq:optimal_weight_observation}$ to compute the Kalman gain for the EKF. 
$$
\begin{equation} \label{eq:kalman_gain_ekf}
K_{k+1} = \Sigma_{k+1|k} C_{k+1}^\top \left(C_{k+1} \Sigma_{k+1|k} C_{k+1}^\top + Q\right)^{-1}.
\end{equation}
$$
Then we can update our state estimate using the fake observation $y_{k+1}'$ following $\eqref{eq:linear_combination_observation_innovation_form}$:
$$
\begin{align} 
\hat{x}_{k+1|k+1} &= \hat{x}_{k+1|k} + K_{k+1} \left(y_{k+1}' - C_{k+1} \hat{x}_{k+1|k}\right) \label{eq:ekf_update_fake_observation} \\
&= \hat{x}_{k+1|k} + K_{k+1} \left(\left(y_{k+1} - g(\mu_{k+1|k}) + C_{k+1} \mu_{k+1|k} \right) - C_{k+1} \hat{x}_{k+1|k}\right) \label{eq:ekf_update_actual_observation}
\end{align}
$$
We can now find the Gaussian parameters of $\hat{x}_{k+1|k+1}$. First we find the mean:
$$
\begin{align}
\mu_{k+1|k+1} &= \mathbb{E}\left[ \hat{x}_{k+1|k+1} \right] \\
&= \mathbb{E}\left[ \hat{x}_{k+1|k} + K_{k+1} \left(\left(y_{k+1} - g(\mu_{k+1|k}) + C_{k+1} \mu_{k+1|k} \right) - C_{k+1} \hat{x}_{k+1|k}\right) \right] \\
&= \mu_{k+1|k} + K_{k+1} \left( \mathbb{E}\left[ y_{k+1} - g(\mu_{k+1|k}) \right] + \mathbb{E}\left[C_{k+1} \mu_{k+1|k} \right] - \mathbb{E}\left[ C_{k+1} \hat{x}_{k+1|k} \right] \right) \\
&= \mu_{k+1|k} + K_{k+1} \left( y_{k+1} - g(\mu_{k+1|k}) \right)
\end{align}
$$
Next we find the covariance following $\eqref{eq:kalman_filter_update_covariance}$:
$$
\begin{align}
\Sigma_{k+1|k+1} &= \left(I - K_{k+1} C_{k+1} \right) \Sigma_{k+1|k} \label{eq:ekf_update_covariance}
\end{align}
$$


## Reinforcement Learning

Let $S$ denote the state space, $A$ denote the action space, we define a trajectory to be
$$
\tau = (s_1, a_2, \ldots, s_T, a_T),
$$
which is a sequence of states and actions. We define a reward function $r: S \times A \to \mathbb{R}$, which gives us a reward for taking action $a$ in state $s$. We define the return of a trajectory to be
$$
\begin{equation} \label{eq:lr-total-return}
R(\tau) = \sum_{t=1}^T r(s_t, a_t)
\end{equation}
$$
which is the total reward accumulated along the trajectory. We define a policy
$$
\pi_\theta(a_t \mid s_t)
$$
which is a probability distribution over actions given the current state, parameterized by $\theta$. We define the **trajectory distribution** under policy $\pi_\theta$ to be
$$
\begin{equation} \label{eq:trajectory_probability}
p_\theta(\tau) = p(s_1) \prod_{t=1}^T \pi_\theta(a_t \mid s_t) p(s_{t+1}\mid s_t, a_t)
\end{equation}
$$
where $p(s_1)$ is the initial state distribution and $p(s_{t+1}\mid s_t, a_t)$ is the transition probability of going to state $s_{t+1}$ given that we are in state $s_t$ and take action $a_t$. 

<details><summary>Factorization of the trajectory distribution</summary>

By definition, the trajectory distribution is defined as:
$$
p_\theta(\tau) = p(s_1, a_2, \ldots, s_T, a_T).
$$
Using the chain rule $\eqref{eq:chain_rule}$, we can factorize this joint distribution as follows:
$$
\begin{aligned}
p_\theta(\tau) &= p(s_1, a_2, \ldots, s_T, a_T) \\
&= p(s_1) p(a_2\mid s_1) p(s_2 \mid s_1, a_2) p(a_3 \mid s_1, a_2, s_2) \cdots
\end{aligned}
$$
We are working in a Markov Decision Process (MDP) setting, which means that the transition probability only depends on the current state and action
$$
p(s_{t+1} \mid s_1, a_2, \ldots, s_t, a_t) = p(s_{t+1} \mid s_t, a_t).
$$
and the policy only depends on the current state
$$
\pi_\theta(a_t \mid s_1, a_2, \ldots, s_t) = \pi_\theta(a_t \mid s_t).
$$
Therefore, we can simplify the factorization of the trajectory distribution to be:
$$
p_\theta(\tau) = p(s_1) \prod_{t=1}^T \pi_\theta(a_t \mid s_t) p(s_{t+1}\mid s_t, a_t),
$$
which is the expression given in $\eqref{eq:trajectory_probability}$.

</details>

The goal of RL is to find the optimal policy parameters $\theta^*$ that maximize the expected return of the trajectory distribution:
$$
\begin{equation} \label{eq:rl-objective}
\theta^* = \arg\max_\theta \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[R(\tau)\right].
\end{equation}
$$
We define the obective function to be
$$
\begin{equation} \label{eq:rl-objective-function}
J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[R(\tau)\right].
\end{equation}
$$
To optimize this objective function, we can use gradient ascent
$$
\begin{equation} \label{eq:gradient_ascent}
\theta \leftarrow \theta + \alpha \nabla_\theta J(\theta),
\end{equation}
$$
Therefore, our main task is to compute the policy gradient $\nabla_\theta J(\theta)$. 

### Policy Gradient

To compute the policy gradient, we first express the objective function as an summation over the trajectory space following the definition of expectation $\eqref{eq:function_expectation}$:
$$
\begin{equation} \label{eq:objective_function_trajectory_sum}
J(\theta) = \sum_\tau p_\theta(\tau) R(\tau).
\end{equation}
$$
Since the $R(\tau)$ term does not depend on $\theta$, we can take the gradient w.r.t. $\theta$ and move it inside the summation:
$$
\nabla_\theta J(\theta) = \sum_\tau  \nabla_\theta p_\theta(\tau) R(\tau).
$$
Given the property
$$
\begin{equation} \label{eq:log_derivative_trick}
\nabla_\theta \log p_\theta(\tau) = \frac{\nabla_\theta p_\theta(\tau)}{p_\theta(\tau)},
\end{equation}
$$
we can rewrite the policy gradient as follows:
$$
\begin{align}
\nabla_\theta J(\theta) &= \sum_\tau p_\theta(\tau) \nabla_\theta \log p_\theta(\tau) R(\tau)  \\
\nabla_\theta J(\theta) &= \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\nabla_\theta \log p_\theta(\tau) R(\tau)\right]. \label{eq:policy_gradient_before_expansion}
\end{align}
$$
We expand $\nabla_\theta \log p_\theta(\tau)$ using the factorization of the trajectory distribution $\eqref{eq:trajectory_probability}$, and the fact that $\log(ab) = \log a + \log b$:
$$
\begin{aligned}
\nabla_\theta \log p_\theta(\tau) &= \nabla_\theta \log \left( p(s_1) \prod_{t=1}^T \pi_\theta(a_t \mid s_t) p(s_{t+1}\mid s_t, a_t) \right) \\
&= \nabla_\theta \left( 
    \log p(s_1) + \sum_{t=1}^T \log \pi_\theta(a_t \mid s_t) + \sum_{t=1}^T \log p(s_{t+1}\mid s_t, a_t)
\right) \\
&= \nabla_\theta \log p(s_1) + \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) + \sum_{t=1}^T \nabla_\theta \log p(s_{t+1}\mid s_t, a_t).
\end{aligned}
$$
The term $\nabla_\theta \log p(s_1)$ is zero since the initial state distribution does not depend on $\theta$. The term $\nabla_\theta \log p(s_{t+1}\mid s_t, a_t)$ is also zero since the transition probability does not depend on $\theta$. Therefore, we have
$$
\begin{equation} \label{eq:log_trajectory_gradient}
\nabla_\theta \log p_\theta(\tau) = \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t).
\end{equation}
$$
Substituting back into the policy gradient $\eqref{eq:policy_gradient_before_expansion}$:
$$
\begin{equation} \label{eq:policy_gradient_final}
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \right) R(\tau)\right]
\end{equation}
$$
This is the policy gradient, which gives us a way to compute the gradient of the expected return w.r.t. the policy parameters $\theta$ using samples from the trajectory distribution. In practice, we can estimate this policy gradient using **Monte Carlo sampling** by generating trajectories using the current policy and computing the empirical return for each trajectory:
$$
\begin{equation} \label{eq:monte_carlo_policy_gradient_estimate}
\nabla_\theta J(\theta) \approx \frac{1}{N} \sum_{i=1}^N \left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t^{(i)} \mid s_t^{(i)}) \right) R(\tau^{(i)}),
\end{equation}
$$
where $\tau^{(i)}$ is the $i$-th trajectory sampled from the current policy, and $N$ is the number of trajectories sampled. This is known as the REINFORCE algorithm.


### Policy Gradient with Reward-to-Go

The policy gradient in $\eqref{eq:policy_gradient_final}$ uses the total return $R(\tau)$ for the entire trajectory. However, we can improve the gradient estimation by recognizing that an action taken at time $t$ should only be influenced by the rewards that come after it, not the rewards that came before. This leads to the **reward-to-go** formulation.

The **reward-to-go** at time $t$ is defined as:
$$
\begin{equation} \label{eq:reward_to_go}
G_t = \sum_{t'=t}^T r(s_{t'}, a_{t'}),
\end{equation}
$$
which is the cumulative reward from time $t$ onwards. Note that $G_t$ depends only on future rewards relative to time $t$, not past rewards.

We can rewrite the policy gradient using reward-to-go:
$$
\begin{equation} \label{eq:policy_gradient_reward_to_go}
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \, G_t\right].
\end{equation}
$$

We show that the reward-to-go formulation is still an unbiased estimator of the policy gradient. First, we can split $\eqref{eq:lr-total-return}$ into $B_t$ and $G_t$:
$$
\begin{equation} \label{eq:return_split}
R(\tau) = B_t + G_t, \quad \text{where } B_t = \sum_{t'=1}^{t-1} r(s_{t'}, a_{t'}), \quad G_t = \sum_{t'=t}^T r(s_{t'}, a_{t'}).
\end{equation}
$$
Substituting this back into the original policy gradient $\eqref{eq:policy_gradient_final}$:
$$
\begin{align}
\nabla_\theta J(\theta) &= \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \right) R(\tau)\right] \\
&= \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \right) (B_t + G_t)\right] \\
&= \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t\right] + \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) G_t\right] \\
\end{align}
$$
We want to show that 
$$
\mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t\right] = 0.
$$
Given linearity of expectation, we can show that each term in the summation is zero:
$$
\mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t\right] = 0.
$$
We write the expectation in the summation form:
$$
\sum_\tau p_\theta(\tau) \nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t.
$$
We split the trajectory $\tau$ into three parts: the part before time $t$, the part at time $t$, and the part after time $t$:
$$
\tau = (h_t, a_t, f_t), \quad \text{where } h_t = (s_1, a_1, \ldots, s_t), f_t = (s_{t+1}, a_{t+1}, \ldots, s_T, a_T).
$$
We can now split the summation over $\tau$ into three summations over $h_t, a_t, f_t$:
$$
\sum_{h_t} \sum_{a_t} \sum_{f_t} p_\theta(h_t, a_t, f_t) \nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t.
$$
Note that term $\nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t$ does not depend on $f_t$, so we can sum out the future:
$$
\sum_{h_t} \sum_{a_t} p_\theta(h_t, a_t) \nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t.
$$
We rewrite $p_\theta(h_t, a_t)$ using the chain rule:
$$
p_\theta(h_t, a_t) = p_\theta(h_t) p_\theta(a_t \mid h_t) = p_\theta(h_t) \pi_\theta(a_t \mid s_t).
$$
We substitute this back into the summation:
$$
\sum_{h_t}  p_\theta(h_t) \sum_{a_t} \pi_\theta(a_t \mid s_t) \nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t.
$$
And since $B_t$ does not depend on $a_t$, we can move it outside the summation:
$$
\sum_{h_t}  p_\theta(h_t) B_t \sum_{a_t} \pi_\theta(a_t \mid s_t) \nabla_\theta \log \pi_\theta(a_t \mid s_t).
$$
Written in expectation form, we have:
$$
\mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t\right] = \mathbb{E}_{h_t \sim p_\theta(h_t)}\left[B_t \mathbb{E}_{a_t \sim \pi_\theta(a_t \mid s_t)}\left[\nabla_\theta \log \pi_\theta(a_t \mid s_t)\right]\right].
$$
We then compute the inner expectation:
$$
\begin{align*}
\mathbb{E}_{a_t \sim \pi_\theta(a_t \mid s_t)}\left[\nabla_\theta \log \pi_\theta(a_t \mid s_t)\right] &= \sum_{a_t} \pi_\theta(a_t \mid s_t) \nabla_\theta \log \pi_\theta(a_t \mid s_t) \\
&= \sum_{a_t} \pi_\theta(a_t \mid s_t) \left( \frac{1}{\pi_\theta(a_t \mid s_t)} \nabla_\theta \pi_\theta(a_t \mid s_t)\right) \\
&= \sum_{a_t} \nabla_\theta \pi_\theta(a_t \mid s_t) \\
&= \nabla_\theta \sum_{a_t} \pi_\theta(a_t \mid s_t) \\
&= \nabla_\theta 1 = 0.
\end{align*}
$$
Therefore, we have shown that
$$
\mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t\right] = 0,
$$
which means that the reward-to-go formulation has the exact same gradient as the original formulation, and is therefore an unbiased estimator of the policy gradient. 

In general, a baseline defined as
$$
b(h_t), \quad \text{where } h_t = (s_1, a_1, \ldots, s_t)
$$
can be subtracted from the return without changing the expected value of the policy gradient:
$$
\begin{equation} \label{eq:policy_gradient_with_baseline}
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \left(G_t - b(h_t)\right)\right].
\end{equation}
$$
Note that the baseline can be any function of the history $h_t$ up to time $t$, as long as it does not depend on the action at time $t$ or future actions.

### Value Functions and Advantage Functions

The reward-to-go $G_t$ defined in $\eqref{eq:reward_to_go}$ is a sample-based quantity: for a particular trajectory, it gives the actual cumulative reward obtained from time $t$ onward. In RL, it is often useful to consider the _expected_ future return conditioned on the current state or action. This leads to the definitions of the state-value function, action-value function, and advantage function.

#### State-Value Function

The **state-value function** under policy $\pi$ measures the expected future return starting from state $s$ and then following policy $\pi$ thereafter:
$$
\begin{equation} \label{eq:state_value_reward_to_go}
V^\pi(s_t) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[G_t \mid s_t\right].
\end{equation}
$$
Thus, $G_t$ is a Monte Carlo sample of $V^\pi(s_t)$.

#### Action-Value Function

The **action-value function** under policy $\pi$ measures the expected future return starting from state $s$, taking action $a$, and then following policy $\pi$ thereafter:
$$
\begin{equation} \label{eq:action_value_reward_to_go}
Q^\pi(s_t,a_t) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[G_t \mid s_t,\; a_t\right].
\end{equation}
$$
The difference between $V^\pi(s_t)$ and $Q^\pi(s_t,a_t)$ is that $V^\pi(s_t)$ averages over the action chosen by the policy, while $Q^\pi(s_t,a_t)$ conditions on a particular action being taken.

#### Relationship Between $V^\pi$ and $Q^\pi$

The state-value function is the expectation of the action-value function over the policy:
$$
\begin{equation} \label{eq:v_from_q}
V^\pi(s_t) = \mathbb{E}_{a \sim \pi_\theta(\cdot \mid s_t)}\left[Q^\pi(s_t,a_t)\right].
\end{equation}
$$
For discrete action spaces, this can be written explicitly as
$$
\begin{equation} \label{eq:v_from_q_discrete}
V^\pi(s_t) = \sum_{a} \pi_\theta(a \mid s_t) Q^\pi(s_t,a).
\end{equation}
$$
This equation shows that $V^\pi(s)$ is the average quality of the actions available in state $s$, weighted by how likely the policy is to choose each action.

#### Advantage Function

The **advantage function** compares the value of taking a particular action to the average value of the state:
$$
\begin{equation} \label{eq:advantage_function}
A^\pi(s,a) = Q^\pi(s,a) - V^\pi(s).
\end{equation}
$$
It measures how much better or worse action $a$ is relative to the average action that the policy would take in state $s$.
- If $A^\pi(s,a) > 0$, then action $a$ is better than average in state $s$.
- If $A^\pi(s,a) < 0$, then action $a$ is worse than average in state $s$.
- If $A^\pi(s,a) = 0$, then action $a$ is exactly as good as the policy's average action in state $s$.

Using $\eqref{eq:v_from_q}$, we can also see that the advantage has zero mean under the policy:
$$
\begin{align}
\mathbb{E}_{a \sim \pi(\cdot \mid s)}\left[A^\pi(s,a)\right]
&= \mathbb{E}_{a \sim \pi(\cdot \mid s)}\left[Q^\pi(s,a) - V^\pi(s)\right] \\
&= \mathbb{E}_{a \sim \pi(\cdot \mid s)}\left[Q^\pi(s,a)\right] - V^\pi(s) \\
&= V^\pi(s) - V^\pi(s) = 0. \label{eq:advantage_zero_mean}
\end{align}
$$
This property is important because it explains why subtracting a value baseline does not change the expected policy gradient.

#### Advantage as a Baseline-Corrected Return

From $\eqref{eq:policy_gradient_with_baseline}$, we showed that we may subtract any baseline $b(h_t)$ that does not depend on the sampled action $a_t$ without changing the expected value of the gradient. A particularly important choice is the state-value function:
$$
\begin{equation} \label{eq:value_baseline_choice}
b(h_t) = V^\pi(s_t).
\end{equation}
$$
Substituting this into $\eqref{eq:policy_gradient_with_baseline}$ gives
$$
\begin{equation} \label{eq:policy_gradient_with_value_baseline}
\nabla_\theta J(\theta)
=
\mathbb{E}_{\tau \sim p_\theta(\tau)}
\left[
\sum_{t=1}^T
\nabla_\theta \log \pi_\theta(a_t \mid s_t)
\left(G_t - V^\pi(s_t)\right)
\right].
\end{equation}
$$
The term
$$
\begin{equation} \label{eq:empirical_advantage}
\hat{A}_t = G_t - V^\pi(s_t)
\end{equation}
$$
can be interpreted as a sample-based estimate of the true advantage $A^\pi(s_t,a_t)$, since
$$
\begin{align}
\mathbb{E}_{\tau \sim p_\pi(\tau)}\left[G_t - V^\pi(s_t) \mid s_t, a_t\right]
&=
\mathbb{E}_{\tau \sim p_\pi(\tau)}\left[G_t \mid s_t, a_t\right] - V^\pi(s_t) \\
&=
Q^\pi(s_t,a_t) - V^\pi(s_t) \\
&=
A^\pi(s_t,a_t). \label{eq:advantage_estimator_unbiased}
\end{align}
$$
Therefore, $G_t - V^\pi(s_t)$ is an unbiased estimator of the advantage.

This gives a useful interpretation of the policy gradient update: actions whose realized return is larger than expected for the current state are encouraged, while actions whose realized return is smaller than expected are discouraged.

### Actor-Critic Methods

REINFORCE is unbiased, but it often has high variance because it uses full sampled returns. Actor-critic methods reduce this variance by introducing a learned critic, which estimates either the state-value function $V^\pi(s)$, the action-value function $Q^\pi(s,a)$, or the advantage function $A^\pi(s,a)$. The actor updates the policy, while the critic provides a lower-variance training signal. We have the following two components in an actor-critic method:

- The **actor** is the policy $\pi_\theta(a \mid s)$
- The **critic** is a function approximator $V_\phi(s)$

Instead of using the Monte Carlo return $G_t - V^\pi(s_t)$ as the advantage estimator, we can use the critic's estimate of the value function to compute a lower-variance advantage estimator:
$$
\begin{equation} \label{eq:critic_advantage_estimator}
\hat{A}_t \approx G_t - V_\phi(s_t).
\end{equation}
$$
The actor update becomes
$$
\begin{equation} \label{eq:actor_update}
\nabla_\theta J(\theta) \approx \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \hat{A}_t\right].
\end{equation}
$$
The critic is trained to minimize the mean squared error between its value estimates and the observed returns:
$$
\begin{equation} \label{eq:critic_loss}
L(\phi) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \left(V_\phi(s_t) - G_t\right)^2\right].
\end{equation}
$$
The critic can be trained using gradient descent:
$$
\begin{equation} \label{eq:critic_update}
\phi \leftarrow \phi - \beta \nabla_\phi L(\phi),
\end{equation}
$$
where $\beta$ is the learning rate for the critic.