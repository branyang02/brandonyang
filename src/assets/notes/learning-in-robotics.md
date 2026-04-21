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
We extend the Law of Total Probability $\eqref{eq:total_probability}$ to use Random Variables:
$$
\begin{equation} \label{eq:total_probability_rv_discrete}
p_Y(y) = \sum_{x} p_{Y \mid X}(y \mid x) p_X(x).
\end{equation}
$$
$$
\begin{equation} \label{eq:total_probability_rv_continuous}
f_Y(y) = \int_{-\infty}^{\infty} f_{Y \mid X}(y \mid x) f_X(x) \, dx.
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
\mathrm{P}(X_{n+1} \mid X_n, X_{n-1}, \ldots, X_0) = \mathrm{P}(X_{n+1} \mid X_n),
\end{equation}
$$
which states that **future state depends only on the present state, not on the sequence of events that preceded it**.

The random variables $X_n$ take values from a countable set $S$ called the state space. Each element $s_i \in S$ represents a distinct configuration of the system (e.g., a robot's location on a grid).

For a time-homogeneous Markov chain, the probability of transitioning from state $s_i$ to state $s_j$ is independent of time $n$. We define the one-step transition probabilities as:
$$
\begin{equation} \label{eq:transition_probabilities}
P_{ij} = \mathrm{P}(X_{k+1} = s_j \mid X_k = s_i), \quad \forall k \geq 0, \; \forall s_i, s_j \in S.
\end{equation}
$$
These probabilities must satisfy:

- $0 \leq P_{ij} \leq 1$ for all $s_i, s_j \in S$ (valid probabilities).
- $\sum_{s_j \in S} P_{ij} = 1$ for all $s_i \in S$ (the system must transition to some state).

We can arrange these probabilities into a transition matrix $P$, where the entry in the $i$-th row and $j$-th column is $P_{ij}$:
$$
\begin{equation} \label{eq:transition_matrix}
P = \begin{bmatrix}
P_{11} & P_{12} & P_{13} & \cdots \\
P_{21} & P_{22} & P_{23} & \cdots \\
P_{31} & P_{32} & P_{33} & \cdots \\
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
where the entry $P_{ij}^{(k)}$ gives the probability of transitioning from state $s_i$ to state $s_j$ in $k$ steps:
$$
P_{ij}^{(k)} = \mathrm{P}(X_{n+k} = s_j \mid X_n = s_i).
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

The probability of being in a state $s_j$ at time $k + 1$ can be written as the sum over all possible previous states $s_i$ of the probability of being in state $s_i$ at time $k$ multiplied by the transition probability from $s_i$ to $s_j$:
$$
\begin{equation} \label{eq:chapman_kolmogorov_step_swapped}
\mathrm{P}(X_{k+1} = s_j) = \sum_{s_i \in S} \mathrm{P}(X_{k+1} = s_j \mid X_k = s_i)\, \mathrm{P}(X_k = s_i)
= \sum_{s_i \in S} P_{ij}\, \mathrm{P}(X_k = s_i).
\end{equation}
$$
This summation can be expressed compactly using linear algebra. We define a column vector $\pi^{(k)}$ representing the **probability distribution over states** at time $k$:
$$
\pi^{(k)} = \begin{bmatrix} \pi_{1} \\ \pi_{2} \\ \vdots \\ \pi_{m} \end{bmatrix} = \begin{bmatrix} \mathrm{P}(X_k = s_1) \\ \mathrm{P}(X_k = s_2) \\ \vdots \\ \mathrm{P}(X_k = s_m) \end{bmatrix},
$$
where $S = \{s_1, s_2, \ldots, s_m\}$, and $\sum_{i=1}^m \pi_i = 1$. The evolution of the probability distribution from time $k$ to $k+1$ is then given by:
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

As $n \to \infty$, the probability distribution $\pi^{(n)}$ may converge to a fixed vector $\pi$ that does not change as time progresses. This is known as the **stationary distribution**:
$$
\begin{equation} \label{eq:stationary_distribution}
\pi = P^T \pi, \quad \text{subject to } \sum_{i=1}^m \pi_i = 1.
\end{equation}
$$
The condition $\sum_{i=1}^m \pi_i = 1$ ensures that $\pi$ remains a valid probability distribution. For the robot, this represents the long-term probability of being in each state if the system evolves indefinitely without external intervention.

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
\pi^{(0)} = \begin{bmatrix} \mathrm{P}(X_0 = \text{Idle}) \\ \mathrm{P}(X_0 = \text{Moving}) \\ \mathrm{P}(X_0 = \text{Working}) \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}.
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

A Hidden Markov Model (HMM) consists of a hidden state sequence $X_1, \ldots, X_n$ that forms a Markov chain, together with an observation sequence $Y_1, \ldots, Y_n$, where each observation $Y_k$ is conditionally independent of all other states and observations given the corresponding hidden state $X_k$.

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

Formally, A HMM is a pair of stochastic processes
$\{X_k\}_{k=1}^{n}$ and $\{Y_k\}_{k=1}^{n}$ where:

- $X_k$ is the (unobserved) **hidden state** at time $k$, taking values in a countable state space $S = \{s_1, s_2, \ldots, s_m\}$.
- $Y_k$ is the **observation** at time $k$, taking values in an observation space $\mathcal{Y} = \{y_1, y_2, \ldots, y_l\}$.

An HMM $\lambda$ is specified by parameters
$$
\lambda = (\pi, P, M)
$$
where $\pi \in \mathbb{R}^{m}$ is the initial distribution, $P \in \mathbb{R}^{m \times m}$ is the state transition matrix, and $M \in \mathbb{R}^{m \times l}$ is the emission (measurement) model.

The model is defined by the following assumptions.

First, the hidden state process satisfies the Markov property:
$$
\begin{equation} \label{eq:hmm_markov}
\mathrm{P}\left(X_k \mid X_{k - 1}, \ldots, X_1 \right) = \mathrm{P} \left(X_k \mid X_{k - 1} \right), \quad \forall k \geq 2.
\end{equation}
$$
We define the initial distribution by
$$
\begin{equation} \label{eq:hmm_initial_distribution}
\pi = \pi^{(1)} \begin{bmatrix} \pi_{s_1} \\ \pi_{s_2} \\ \vdots \\ \pi_{s_m} \end{bmatrix} = \begin{bmatrix} p(X_1 = s_1) \\ p(X_1 = s_2) \\ \vdots \\ p(X_1 = s_m) \end{bmatrix}, \quad \text{with } \sum_{i=1}^m \pi_{s_i} = 1,
\end{equation}
$$
and the one-step transition probabilities by
$$
\begin{equation} \label{eq:hmm_transition_probabilities}
P_{s_i, s_j} = \mathrm{P}(X_{k+1} = s_j \mid X_k = s_i), \quad \forall k \geq 0, \; \forall s_i, s_j \in S.
\end{equation}
$$

Second, the observations are _conditionally independent_ $\eqref{eq:conditional_independence_equivalent}$ given the hidden states and only depend on the current state:
$$
\begin{equation} \label{eq:hmm_emission}
\mathrm{P}(Y_k \mid X_1, \ldots, X_k, Y_1, \ldots, Y_{k-1}) = \mathrm{P}(Y_k \mid X_k), \quad \forall k \geq 1.
\end{equation}
$$
We parameterize this distribution by the emission model
$$
\begin{equation} \label{eq:hmm_emission_model}
M_{s_i, y_j} = \mathrm{P}(Y_k = y_j \mid X_k = s_i), \quad \forall k \geq 1, \; \forall s_i \in S, y_j \in \mathcal{Y}.
\end{equation}
$$
Under these assumptions, the joint distribution over a state sequence $x_{1:n}$ and an observation sequence $y_{1:n}$ can be factorized as:
$$
\begin{equation} \label{eq:hmm_factorization}
\operatorname{P}\left(X_{1: n}=x_{1: n}, Y_{1: n} = y_{1: n}\right) =\operatorname{P}\left(X_1=x_1\right) \prod_{k=2}^n \operatorname{P}\left(X_k=x_k \mid X_{k-1}=x_{k-1}\right) \prod_{k=1}^n \operatorname{P}\left(Y_k=y_k \mid X_k=x_k\right)
\end{equation}
$$
where each term is a scalar probability from the model parameters $\lambda = (\pi, P, M)$.

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
Substituting these simplifications back into the chain rule expansion and we obtain the desired factorization:
$$
p(x_{1:n}, y_{1:n}) = p(x_1) \prod_{k=2}^n p(x_k \mid x_{k-1}) \prod_{k=1}^n p(y_k \mid x_k).
$$
</details>

<details><summary>HMM Example</summary>

Suppose a robot moves in a hallway with 3 positions:
$$
S = \{s_1, s_2, s_3\}
$$
The robot has a sensor that observes whether it is near a door or wall:
$$
\mathcal{Y} = \{\text{door}, \text{wall}\}
$$

Assume robot starts in the middle with high probability:
$$
\pi = \begin{bmatrix} \mathrm{P}(X_1 = s_1) \\ \mathrm{P}(X_1 = s_2) \\ \mathrm{P}(X_1 = s_3) \end{bmatrix} = \begin{bmatrix} 0.1 \\ 0.8 \\ 0.1 \end{bmatrix}.
$$
Suppose the robot has the following transition probabilities:
$$
P=\left[\begin{array}{lll}
0.7 & 0.3 & 0.0 \\
0.2 & 0.6 & 0.2 \\
0.0 & 0.3 & 0.7
\end{array}\right]
$$

Suppose position 2 is near a door, position 1 and 3 are near walls, and the sensor is noisy with the following emission probabilities:
$$
\begin{array}{ll}
M_{s_1, \text { door }} = \mathrm{P}(Y_k = \text{door} \mid X_k = s_1) = 0.1, & M_{s_1, \text { wall }} = \mathrm{P}(Y_k = \text{wall} \mid X_k = s_1) = 0.9, \\
M_{s_2, \text { door }} = \mathrm{P}(Y_k = \text{door} \mid X_k = s_2) = 0.8, & M_{s_2, \text { wall }} = \mathrm{P}(Y_k = \text{wall} \mid X_k = s_2) = 0.2, \\
M_{s_3, \text { door }} = \mathrm{P}(Y_k = \text{door} \mid X_k = s_3) = 0.1, & M_{s_3, \text { wall }} = \mathrm{P}(Y_k = \text{wall} \mid X_k = s_3) = 0.9.
\end{array}
$$
Equivalently, we can write the emission model as a matrix:
$$
M=\left[\begin{array}{ll}
M_{s_1, \text { door }} & M_{s_1, \text { wall }} \\
M_{s_2, \text { door }} & M_{s_2, \text { wall }} \\
M_{s_3, \text { door }} & M_{s_3, \text { wall }}
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
    \text{Filtering: } p(x_k \mid y_{1:k}).
    \end{equation}
    $$
    This is the belief state at time $k$, which represents our uncertainty about the current state given all past observations. In robotics, this corresponds to estimating the robot’s current state as new sensor data arrives sequentially.
2. **Smoothing**
    Given observations up to time $k$, compute the distribution of the state at anytime $j < k$:
    $$
    \begin{equation} \label{eq:hmm_smoothing_problem}
    \text{Smoothing: } p(x_j \mid y_{1:k}) ,\quad j < k.
    \end{equation}
    $$
    We use both **past and future** observations (relative to time $j$) to improve the estimate of an earlier state. In robotics, smoothing is useful for offline analysis, mapping, or trajectory refinement after data collection.
3. **Prediction**

    Given observations up to time $k$, compute the distribution of the state at a time $j > k$:
    $$
    \begin{equation} \label{eq:hmm_prediction_problem}
    \text{Prediction: } p(x_j \mid y_{1:k}) ,\quad j > k.
    \end{equation}
    $$
    This uses the system dynamics to project uncertainty forward in time beyond the last observation. In robotics, prediction is used for forecasting motion, planning, and anticipating future states of the system.
4. **Decoding**:
    Given observations up to time $k$, find the most likely hidden state sequence:
    $$
    \begin{equation} \label{eq:hmm_decoding_problem}
    \text{Decoding: } x^*_{1:k} = \arg\max_{x_{1:k}} p(x_{1:k} \mid y_{1:k}).
    \end{equation}
    $$
    This finds the single most probably trajectory of hidden states explaining the observations. In robotics and speech recognition, this corresponds to trajectory estimation or sequence labeling (typically solved by the Viterbi algorithm).
5. **Likelihood of Observations**:
    Given the observation trajectory $y_{1:k}$, compute the probability:
    $$
    \begin{equation} \label{eq:hmm_likelihood_problem}
    \text{Likelihood of Observations: } p(y_{1:k}).
    \end{equation}
    $$
    This measures how well the model explains the data.

These problems can be solved with forward-backward algorithms, Viterbi algorithm, and other dynamic programming techniques tailored for HMMs.

#### Forward Algorithm

Given an **observed** sequence $y_{1:n}$, we define the **forward variable** $\alpha_k(s)$ as the joint probability of the observation sequence up to time $k$ and the state being $s$ at time $k$:
$$
\begin{equation} \label{eq:forward_variable}
\alpha_k(s) = \mathrm{P}(Y_{1:k} = y_{1:k}, X_k = s).
\end{equation}
$$
The algorithm proceeds recursively:

1. **Base Case** ($k=1$): Using the definition of conditional probability $\eqref{eq:conditional_pmf}$:
   $$
   \begin{equation} \label{eq:forward_base_case}
   \alpha_1(s) = \mathrm{P}(Y_1 = y_1, X_1 = s) = p(y_1 \mid s) p(s) = M_{s, y_1} \pi_s.
   \end{equation}
   $$
2. **Recursive Case** ($k > 1$): We can express $\alpha_k(s)$ in terms of $\alpha_{k-1}(s')$:
   $$
   \begin{equation} \label{eq:forward_recursive_case}
   \alpha_k(s) = \left[ \sum_{s' \in S} \alpha_{k-1}(s')P_{s', s} \right] M_{s, y_k}.
   \end{equation}
   $$
3. **Termination**: The likelihood of the observation sequence is the sum of the forward variables at time $n$:
   $$
    \begin{equation} \label{eq:forward_termination}
    p(y_{1:n}) = \sum_{s \in S} \alpha_n(s).
    \end{equation}
   $$

<details><summary>Forward Algorithm Example</summary>

Following the previous HMM example:
$$
\mathcal{Y} = \{\text{door}, \text{wall}\}, \quad S = \{s_1, s_2, s_3\}, \quad \lambda = (\pi, P, M),
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
\alpha_k(s) = \mathrm{P}(Y_{1:k} = y_{1:k}, X_k = s), \quad s \in S, \quad k = 1, 2, 3.
$$
We initialize with $k=1$ with $y_1 = \text{door}$ following $\eqref{eq:forward_base_case}$:
$$
\begin{align*}
\alpha_1(s_1) &= M_{s_1, \text{door}} \pi_{s_1} = 0.1 \cdot 0.1 = 0.01, \\
\alpha_1(s_2) &= M_{s_2, \text{door}} \pi_{s_2} = 0.8 \cdot 0.8 = 0.64, \\
\alpha_1(s_3) &= M_{s_3, \text{door}} \pi_{s_3} = 0.1 \cdot 0.1 = 0.01.
\end{align*}
$$
Next, we compute $\alpha_2(s)$ with $y_2 = \text{wall}$ using $\eqref{eq:forward_recursive_case}$:
$$
\begin{align*}
\alpha_2(s_1) &= \left[ \alpha_1(s_1)P_{s_1, s_1} + \alpha_1(s_2)P_{s_2, s_1} + \alpha_1(s_3)P_{s_3, s_1} \right] M_{s_1, \text{wall}}, \\
&= \left[ 0.01 \cdot 0.7 + 0.64 \cdot 0.2 + 0.01 \cdot 0.0 \right] \cdot 0.9 = 0.1215 \\
\alpha_2(s_2) &= \left[ \alpha_1(s_1)P_{s_1, s_2} + \alpha_1(s_2)P_{s_2, s_2} + \alpha_1(s_3)P_{s_3, s_2} \right] M_{s_2, \text{wall}}, \\
&= \left[ 0.01 \cdot 0.3 + 0.64 \cdot 0.6 + 0.01 \cdot 0.3 \right] \cdot 0.2 = 0.078, \\
\alpha_2(s_3) &= \left[ \alpha_1(s_1)P_{s_1, s_3} + \alpha_1(s_2)P_{s_2, s_3} + \alpha_1(s_3)P_{s_3, s_3} \right] M_{s_3, \text{wall}}, \\
&= \left[ 0.01 \cdot 0.0 + 0.64 \cdot 0.2 + 0.01 \cdot 0.7 \right] \cdot 0.9 = 0.1215.
\end{align*}
$$
Finally we compute $\alpha_3(s)$ with $y_3 = \text{door}$ using the same recursive formula. Below is an example code snippet for computing forward variables in Python:

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
\alpha_3(s_1) &= 0.010065, \\
\alpha_3(s_2) &= 0.09576, \\
\alpha_3(s_3) &= 0.010065.
\end{align*}
$$

We can now compute the likelihood of the observation sequence following $\eqref{eq:forward_termination}$:
$$
p(y_{1:3}) = \alpha_3(s_1) + \alpha_3(s_2) + \alpha_3(s_3) = 0.11589.
$$

We can format the forward variable matrix as follows:

$$
\alpha = \begin{bmatrix}
\alpha_1(s_1) & \alpha_1(s_2) & \alpha_1(s_3) \\
\alpha_2(s_1) & \alpha_2(s_2) & \alpha_2(s_3) \\
\alpha_3(s_1) & \alpha_3(s_2) & \alpha_3(s_3)
\end{bmatrix} =
\begin{bmatrix}
0.01 & 0.64 & 0.01 \\
0.1215 & 0.078 & 0.1215 \\
0.010065 & 0.09576 & 0.010065
\end{bmatrix}.
$$

</details>

#### Backward Algorithm

Given an observed sequence $y_{1:n}$, we define the **backward variable** $\beta_k(s)$ as the probability of the _future_ observations from time $k+1$ to $n$, conditioned on the state being $s$ at time $k$:
$$
\begin{equation} \label{eq:backward_variable}
\beta_k(s) = p(Y_{k+1:n} = y_{k+1:n} \mid X_k = s).
\end{equation}
$$
The algorithm proceeds recursively:

1. **Base Case** ($k=n$): There are no future observations, so we set:
   $$
   \begin{equation} \label{eq:backward_base_case}
   \beta_n(s) = 1, \quad \forall s \in S.
   \end{equation}
   $$
2. **Recursive Case** ($k < n$): We can express $\beta_k(s)$ in terms of $\beta_{k+1}(s')$:
   $$
    \begin{equation} \label{eq:backward_recursive_case}
    \beta_k(s) = \sum_{s' \in S} P_{s,s'} M_{s', y_{k+1}} \beta_{k+1}(s').
    \end{equation}
    $$
3. **Termination**: The likelihood of the observation sequence can also be computed using the backward variables at time $1$:
   $$
    \begin{equation} \label{eq:backward_termination}
    p(y_{1:n}) = \sum_{s \in S} \pi_s M_{s, y_1} \beta_1(s).
    \end{equation}
    $$

<details><summary>Backward Algorithm Example</summary>

Following the previous HMM example:
$$
\mathcal{Y} = \{\text{door}, \text{wall}\}, \quad S = \{s_1, s_2, s_3\}, \quad \lambda = (\pi, P, M),
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
\beta_3(s_1), \beta_2(s_2), \beta_1(s_3) \quad \text{for } s \in S.
$$

We initialize with $k=3$ following $\eqref{eq:backward_base_case}$:
$$
\beta_3(s_1) = \beta_3(s_2) = \beta_3(s_3) = 1.
$$
Next, we compute $\beta_2(s)$ with $y_3 = \text{door}$ using $\eqref{eq:backward_recursive_case}$:
$$
\begin{align*}
\beta_2(s_1) &= P_{s_1,s_1}M_{s_1,\text{door}}\beta_3(s_1) + P_{s_1,s_2}M_{s_2,\text{door}}\beta_3(s_2) + P_{s_1,s_3}M_{s_3,\text{door}}\beta_3(s_3) \\
&= 0.7\cdot 0.1 \cdot 1 + 0.3\cdot 0.8 \cdot 1 + 0.0\cdot 0.1 \cdot 1 = 0.31, \\
\beta_2(s_2) &= P_{s_2,s_1}M_{s_1,\text{door}}\beta_3(s_1) + P_{s_2,s_2}M_{s_2,\text{door}}\beta_3(s_2) + P_{s_2,s_3}M_{s_3,\text{door}}\beta_3(s_3) \\
&= 0.2\cdot 0.1 \cdot 1 + 0.6\cdot 0.8 \cdot 1 + 0.2\cdot 0.1 \cdot 1 = 0.52, \\
\beta_2(s_3) &= P_{s_3,s_1}M_{s_1,\text{door}}\beta_3(s_1) + P_{s_3,s_2}M_{s_2,\text{door}}\beta_3(s_2) + P_{s_3,s_3}M_{s_3,\text{door}}\beta_3(s_3) \\
&= 0.0\cdot 0.1 \cdot 1 + 0.3\cdot 0.8 \cdot 1 + 0.7\cdot 0.1 \cdot 1 = 0.31.
\end{align*}
$$
Finally we compute $\beta_1(s)$ with $y_2 = \text{wall}$ using the same recursive formula using the following code snippet:

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
\beta_1(s_1) &= 0.2265, \\
\beta_1(s_2) &= 0.174, \\
\beta_1(s_3) &= 0.2265.
\end{align*}
$$
We can now compute the likelihood of the observation sequence following $\eqref{eq:backward_termination}$:
$$
p(y_{1:3}) = \sum_{s \in S} \pi_s M_{s, y_1} \beta_1(s) = 0.11589.
$$
which matches the likelihood computed from the forward algorithm, confirming the consistency of both methods. The backward variable matrix can be formatted as follows:

$$
\beta = \begin{bmatrix}
\beta_1(s_1) & \beta_1(s_2) & \beta_1(s_3) \\
\beta_2(s_1) & \beta_2(s_2) & \beta_2(s_3) \\
\beta_3(s_1) & \beta_3(s_2) & \beta_3(s_3)
\end{bmatrix} =
\begin{bmatrix}
0.2265 & 0.174 & 0.2265 \\
0.31 & 0.52 & 0.31 \\
1 & 1 & 1
\end{bmatrix}.
$$

</details>

#### Solving Inference Problems

Using the forward variables $\alpha_k(s)$ and backward variables $\beta_k(s)$, we can solve the filtering, smoothing, prediction, and likelihood problems efficiently.

- **Filtering** (online state estimation) $\eqref{eq:hmm_filtering_problem}$:

  The filtering distribution is obtained by normalizing the forward variables:
  $$
  \begin{equation} \label{eq:hmm_filtering_solution}
  p(X_k = s \mid y_{1:k}) = \frac{\alpha_k(s)}{\sum_{s' \in S} \alpha_k(s')}.
  \end{equation}
  $$

- **Smoothing** (offline state estimation) $\eqref{eq:hmm_smoothing_problem}$:

  Using both past and future observations, the smoothed marginal is:
  $$
  \begin{equation} \label{eq:hmm_smoothing_solution}
  p\left(X_j=s \mid y_{1: n}\right)=\frac{\alpha_j\left(s\right) \beta_j\left(s\right)}{\sum_{s' \in S} \alpha_j\left(s'\right) \beta_j\left(s'\right)} .
  \end{equation}
  $$
  which can also be written as
    $$
    p\left(X_j=s \mid y_{1: n}\right)=\frac{\alpha_j\left(s\right) \beta_j\left(s\right)}{p\left(y_{1: n}\right)} .
    $$

    <details><summary>Three ways to compute joint probabilitiy of observations</summary>

    We have shown three ways to compute the likelihood of the observation sequence $p(y_{1:n})$ with $\eqref{eq:forward_termination}$, $\eqref{eq:backward_termination}$, and the denominator of $\eqref{eq:hmm_smoothing_solution}$. We show that they are equivalent.

    We want to show that for any $j \in \{1, \ldots, n\}$,
    $$
    p(y_{1:n}) = \sum_{s \in S} \alpha_n(s) = \sum_{s \in S} \pi_{s} M_{s, y_1} \beta_1(s) = \sum_{s \in S} \alpha_j(s) \beta_j(s).
    $$

    **Identity 1**: $p(y_{1:n}) = \sum_{s \in S} \alpha_n(s)$.

    By the law of total probability, marginalizing over $X_n$:
    $$
    p(y_{1:n}) = \sum_{s \in S} \mathrm{P}(Y_{1:n} = y_{1:n},\, X_n = s) = \sum_{s \in S} \alpha_n(s),
    $$
    where the last equality uses the definition $\eqref{eq:forward_variable}$ of the forward variable.

    **Identity 2**: $p(y_{1:n}) = \sum_{s \in S} \pi_s M_{s, y_1} \beta_1(s)$.

    By the law of total probability, marginalizing over $X_1$:
    $$
    p(y_{1:n}) = \sum_{s \in S} \mathrm{P}(Y_{1:n} = y_{1:n},\, X_1 = s).
    $$
    Factoring each term using the chain rule $\eqref{eq:chain_rule}$ and conditional independence $\eqref{eq:hmm_emission}$:
    $$
    \begin{align*}
    \mathrm{P}(Y_{1:n} = y_{1:n},\, X_1 = s)
    &= \mathrm{P}(Y_1 = y_1 \mid X_1 = s)\,\mathrm{P}(Y_{2:n} = y_{2:n} \mid X_1 = s)\,\mathrm{P}(X_1 = s) \\
    &= M_{s,\,y_1} \cdot \beta_1(s) \cdot \pi_s,
    \end{align*}
    $$
    where $\mathrm{P}(Y_{2:n} = y_{2:n} \mid X_1 = s) = \beta_1(s)$ by definition $\eqref{eq:backward_variable}$. Summing over $s$ gives the result.

    **Identity 3**: $p(y_{1:n}) = \sum_{s \in S} \alpha_j(s)\,\beta_j(s)$ for any $j \in \{1,\ldots,n\}$.

    By the law of total probability, marginalizing over $X_j$:
    $$
    p(y_{1:n}) = \sum_{s \in S} \mathrm{P}(Y_{1:n} = y_{1:n},\, X_j = s).
    $$
    Split the observations at time $j$ and apply the chain rule:
    $$
    \mathrm{P}(Y_{1:n} = y_{1:n},\, X_j = s) = \mathrm{P}(Y_{1:j} = y_{1:j},\, X_j = s)\cdot \mathrm{P}(Y_{j+1:n} = y_{j+1:n} \mid X_j = s,\, Y_{1:j} = y_{1:j}).
    $$
    By the Markov property $\eqref{eq:hmm_markov}$ and conditional independence $\eqref{eq:hmm_emission}$, given $X_j = s$ the future observations $Y_{j+1:n}$ are independent of the past $Y_{1:j}$:
    $$
    \mathrm{P}(Y_{j+1:n} = y_{j+1:n} \mid X_j = s,\, Y_{1:j} = y_{1:j}) = \mathrm{P}(Y_{j+1:n} = y_{j+1:n} \mid X_j = s) = \beta_j(s).
    $$
    Therefore:
    $$
    \mathrm{P}(Y_{1:n} = y_{1:n},\, X_j = s) = \alpha_j(s)\,\beta_j(s),
    $$
    and summing over $s \in S$ completes the proof.


    </details>

- **Prediction** (forecasting future states) $\eqref{eq:hmm_prediction_problem}$:

  First compute the filtering distribution at time $k$, then propagate it forward using the transition matrix. For $j > k$,
  $$
  \begin{equation} \label{eq:hmm_prediction_solution}
  p(X_j = s \mid y_{1:k}) = \sum_{s' \in S} (P^{\,j-k})_{s' s}\; p(X_k = s' \mid y_{1:k}),
  \end{equation}
  $$
  where $P^{\,j-k}$ denotes the $(j-k)$-step transition matrix. In particular, for one-step prediction ($j=k+1$):
  $$
  p(X_{k+1} = s \mid y_{1:k}) = \sum_{s' \in S} P_{s' s}\; p(X_k = s' \mid y_{1:k}).
  $$

- **Likelihood of Observations** $\eqref{eq:hmm_likelihood_problem}$:

  The likelihood of the entire observation sequence can be computed either from the forward variables:
  $$
  \begin{equation} \label{eq:hmm_likelihood_solution_forward}
  p(y_{1:n}) = \sum_{s \in S} \alpha_n(s),
  \end{equation}
  $$
  or from the backward variables:
  $$
  \begin{equation} \label{eq:hmm_likelihood_solution_backward}
  p(y_{1:n}) = \sum_{s \in S} \pi_s\, M_{s, y_1}\, \beta_1(s).
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

We define the **Viterbi (max-product) variable** $\delta_k(s)$ as the probability of the most _likely_ state path ending in state $s$ at time $k$, together with the observations up to $k$:
$$
\begin{equation} \label{eq:viterbi_variable}
\delta_k(s) = \max_{x_{1:k-1}} p(x_{1:k-1}, X_k = s, y_{1:k}).
\end{equation}
$$
We also store the **backpointer** $\psi_k(s)$, which records which previous state achieves the max:
$$
\begin{equation} \label{eq:viterbi_backpointer}
\psi_k(s) = \arg\max_{s' \in S} \left[ \delta_{k-1}(s') P_{s' s} \right], \quad k \geq 2.
\end{equation}
$$

1. **Base Case** ($k=1$):
   $$
   \begin{equation} \label{eq:viterbi_base_case}
   \delta_1(s) = \pi_s M_{s, y_1}, \quad \psi_1(s) = 0, \quad \forall s \in S.
   \end{equation}
   $$
2. **Recursive Case** ($k > 1$):
    $$
    \begin{equation} \label{eq:viterbi_recursive_case}
    \delta_k(s) = \left[ \max_{s' \in S} \delta_{k-1}(s') P_{s' s} \right] M_{s, y_k}, \quad \forall s \in S
    \end{equation}
    $$
    $$
    \begin{equation} \label{eq:viterbi_backpointer_recursive_case}
    \psi_k(s) = \arg\max_{s' \in S} \left[ \delta_{k-1}(s') P_{s' s} \right], \quad \forall s \in S
    \end{equation}
    $$
3. **Termination**:
   $$
   \begin{equation} \label{eq:viterbi_termination}
   p^*= \max_{s \in S} \delta_n(s), \quad x_n^* = \arg\max_{s \in S} \delta_n(s),
   \end{equation}
   $$
   where $p^*$ is the joint probability of the best path with the observations.
4. **Path Backtracking**: After computing $\delta_n(s)$ and $\psi_k(s)$ for all $k$ and $s$, we can backtrack to find the optimal state sequence:
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

### Uncented Kalman Filter (UKF)

UKF is a more accurate way of handling nonlinear systems than EKF. Consider the setting of the same nonlinear dynamical system as EKF:
$$
\begin{equation} \label{eq:ukf_dynamical_system}
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

We define **sigma points**:
$$
\begin{equation} \label{eq:sigma_points}
\text{Sigma Points} = \left\{ x^{(1)}, \ldots, x^{(2d)} \right\}, \quad x^{(i)} \in \mathbb{R}^d
\end{equation}
$$
we denote $x_{k|k}^{(i)}$ to be the $i$-th sigma point corresponding to the state estimate $\hat{x}_{k|k}$. 

#### Propagation Step
The sigma points at the propagation step are computed as follows
$$
\begin{equation}
\begin{aligned}
x_{k|k}^{(i)} &= \mu_{k|k} + \left(\sqrt{d \Sigma_{k|k}} \right)_i^\top \\
x_{k|k}^{(d + i)} &= \mu_{k|k} - \left(\sqrt{d \Sigma_{k|k}} \right)_i^\top \\
\end{aligned}, \quad i = 1, \ldots, d,
\end{equation}
$$

<details><summary> Matrix Square Root</summary>

Given a positive definite matrix $\Sigma \in \mathbb{R}^{d \times d}$, we can compute its square root $\sqrt{\Sigma}$ using SVD.
$$
\Sigma = V D V^\top = V D V^{-1}, \quad D = \mathrm{diag}(\lambda_1, \ldots, \lambda_d)
$$
where $\lambda_1, \ldots, \lambda_d$ are the eigenvalues of $\Sigma$. 

Suppose we have
$$
\Sigma = SS,
$$
then we have the following
$$
SS = V D^{1/2} V^{-1} V D^{1/2} V^{-1} = V D V^{-1} = \Sigma.
$$
Therefore, we can compute the matrix square root as
$$
\sqrt{\Sigma} = V D^{1/2} V^{-1}, \quad D^{1/2} = \mathrm{diag}(\sqrt{\lambda_1}, \ldots, \sqrt{\lambda_d}), \quad \sqrt{\Sigma} \in \mathbb{R}^{d \times d}.
$$

</details>

where $\left(\sqrt{d \Sigma_{k|k}} \right)_i \in \mathbb{R}^{1 \times d}$ is the $i$-th row of the matrix $\sqrt{d \Sigma_{k|k}}$. 

We define a scalar weight for each sigma point:
$$
\begin{equation} \label{eq:sigma_point_weights}
w^{(i)} = \frac{1}{2d}, \quad i = 1, \ldots, 2d.
\end{equation}
$$


We can now propagate each sigma point through the nonlinear dynamics to estimate $\hat{x}_{k+1|k} \sim \mathcal{N}(\mu_{k+1|k}, \Sigma_{k+1|k})$:
$$
\begin{equation} \label{eq:ukf_propagation_mean}
\begin{aligned}
\mu_{k+1|k} &= \sum_{i=1}^{2d} w^{(i)} f\left(x_{k|k}^{(i)}, u_k\right) \\
\Sigma_{k+1|k} &= R + \sum_{i=1}^{2d} w^{(i)} \left(f\left(x_{k|k}^{(i)}, u_k\right) - \mu_{k+1|k}\right) \left(f\left(x_{k|k}^{(i)}, u_k\right) - \mu_{k+1|k}\right)^\top
\end{aligned}
\end{equation}
$$

#### Update Step

We compute new sigma points based on the predicted state estimate $\hat{x}_{k+1|k}$:
$$
\begin{equation}
\begin{aligned}
x_{k+1|k}^{(i)} &= \mu_{k+1|k} + \left(\sqrt{d \Sigma_{k+1|k}} \right)_i^\top \\
x_{k+1|k}^{(d + i)} &= \mu_{k+1|k} - \left(\sqrt{d \Sigma_{k+1|k}} \right)_i^\top \\
\end{aligned}, \quad i = 1, \ldots, d,
\end{equation}
$$
We again define a scalar weight for each sigma point:
$$
\begin{equation}
w^{(i)} = \frac{1}{2d}, \quad i = 1, \ldots, 2d.
\end{equation}
$$
To find the Kalman Gain, we first compute the mean of the sigma points after passing through the observation function $g$:
$$
\begin{equation} \label{eq:ukf_update_observation_mean}
\mu_{y} = \sum_{i=1}^{2d} w^{(i)} g\left(x_{k+1|k}^{(i)}\right)
\end{equation}
$$
Then we compute the measure covariance of the sigma points after passing through the observation function $g$:
$$
\begin{equation} \label{eq:ukf_update_observation_covariance}
\Sigma_{y y} = Q + \sum_{i=1}^{2d} w^{(i)} \left(g\left(x_{k+1|k}^{(i)}\right) - \mu_{y}\right) \left(g\left(x_{k+1|k}^{(i)}\right) - \mu_{y}\right)^\top
\end{equation}
$$
Finally, we compute the cross covariance between the state and the observation:
$$
\begin{equation} \label{eq:ukf_update_cross_covariance}
\Sigma_{x y} = \sum_{i=1}^{2d} w^{(i)} \left(x_{k+1|k}^{(i)} - \mu_{k+1|k}\right) \left(g\left(x_{k+1|k}^{(i)}\right) - \mu_{y}\right)^\top
\end{equation}
$$
We observe that:
$$
\Sigma_{y y} \in \mathbb{R}^{p \times p}, \quad \Sigma_{x y} \in \mathbb{R}^{d \times p}
$$

Given the Kalman Gain for UKF:
$$
\begin{equation} \label{eq:kalman_gain_ukf}
K=\Sigma_{x y} \Sigma_{y y}^{-1}, \quad K \in \mathbb{R}^{d \times p}
\end{equation}
$$

<details><summary>Deriving the Kalman Gain for UKF</summary>

TODO

</details>

We use the Kalman Gain to estimate $\hat{x}_{k+1|k+1} \sim \mathcal{N}(\mu_{k+1|k+1}, \Sigma_{k+1|k+1})$:
$$
\begin{align}
\mu_{k+1|k+1} &= \mu_{k+1|k} + K \left(y_{k+1} - \mu_{y}\right) \label{eq:ukf_update_mean} \\
\Sigma_{k+1|k+1} &= \Sigma_{k+1|k} - \Sigma_{x y} \Sigma_{y y}^{-1} \Sigma_{y x} \label{eq:ukf_update_covariance} \\
&= \Sigma_{k+1|k} - K \Sigma_{yy} K^\top \label{eq:ukf_update_covariance_alternative}
\end{align}
$$

### Particle Filter

We now extend UKF to handle non-Gaussian filtering problems. They key building block of particle filters is importance sampling.

#### Importance Sampling

Given a target distribution $p(x)$ that we want to sample from, we can approximate it with $\hat{p}(x)$ modeled as a weighted sum of Dirac-delta functions:
$$
\begin{equation} \label{eq:particle_filter_approximation}
\hat{p}(x) = \sum_{i=1}^n w^{(i)} \delta_{x^{(i)}}(x)
\end{equation}
$$
where $x^{(i)}$ is the $i$-th sample and $w^{(i)}$ is the corresponding weight. The Dirac delta at $x^{(i)}$ written as $\delta_{x^{(i)}}(x)$ is a distribution that puts all its mass at $x^{(i)}$:
$$
\delta_{x^{(i)}}(x) = \begin{cases}
\infty, & x = x^{(i)} \\
0, & x \neq x^{(i)}
\end{cases}
$$
and it satisfies the property that for any function $f$,
$$
\begin{equation} \label{eq:dirac_delta_property}
\int f(x) \delta_{x^{(i)}}(x) dx = f(x^{(i)}).
\end{equation}
$$
For example, to compute the expectation of $\hat{p}(x)$ for some function $f$, we can do the following:
$$
\begin{align}
\mathbb{E}_{x \sim \hat{p}(x)}[f(x)] &= \int f(x) \hat{p}(x) dx \\
&= \int f(x) \sum_{i=1}^n w^{(i)} \delta_{x^{(i)}}(x) dx \\
&= \sum_{i=1}^n w^{(i)} \int f(x) \delta_{x^{(i)}}(x) dx \\
&= \sum_{i=1}^n w^{(i)} f(x^{(i)}) \label{eq:expectation_particle_filter}
\end{align}
$$
To make sure $\hat{p}(x)$ approximates the **target distribution** $p(x)$ well, we can use importance sampling. Given a **proposal distribution** $q(x)$ that we can easily sample from (such as Gaussian), we can sample $x^{(i)} \sim q(x)$ for $i = 1, \ldots, n$ and assign weights to each sample as follows:
$$
\begin{equation} \label{eq:importance_sampling_weights}
\tilde{w}^{(i)} = \frac{p(x^{(i)})}{q(x^{(i)})}, \quad i = 1, \ldots, n.
\end{equation}
$$
We can then normalize the weights to get a valid probability distribution in $\eqref{eq:particle_filter_approximation}$:
$$
\begin{equation} \label{eq:importance_sampling_normalized_weights}
w^{(i)} = \frac{\tilde{w}^{(i)}}{\sum_{j=1}^n \tilde{w}^{(j)}}, \quad i = 1, \ldots, n.
\end{equation}
$$

<details><summary>Example of Importance Sampling</summary>

Let the target be:
$$
p(x) = \mathcal{N}(0, 1)
$$
and the proposal be:
$$
q(x) = \mathcal{N}(2, 4).
$$
Suppose we draw 5 examples from $q(x)$:
$$
x^{(1)}=-1, \quad x^{(2)}=0, \quad x^{(3)}=1, \quad x^{(4)}=2, \quad x^{(5)}=4
$$
Then we can compute the unnormalized weights for each sample as follows:
$$
\tilde{w}^{(i)}=\frac{p\left(x^{(i)}\right)}{q\left(x^{(i)}\right)}
$$
Using the formula for Gaussian distribution:
- $p(-1) \approx 0.242, q(-1) \approx 0.065$, so $\tilde{w}^{(1)} \approx 3.72$
- $p(0) \approx 0.399, q(0) \approx 0.121$, so $\tilde{w}^{(2)} \approx 3.30$
- $p(1) \approx 0.242, q(1) \approx 0.176$, so $\tilde{w}^{(3)} \approx 1.37$
- $p(2) \approx 0.054, q(2) \approx 0.199$, so $\tilde{w}^{(4)} \approx 0.27$
- $p(4) \approx 0.000134, q(4) \approx 0.121$, so $\tilde{w}^{(5)} \approx 0.0011$

We then normalize the weights:
$$
w^{(i)} = \frac{\tilde{w}^{(i)}}{\sum_{j=1}^5 \tilde{w}^{(j)}}
$$
- $w^{(1)} \approx 0.43$
- $w^{(2)} \approx 0.38$
- $w^{(3)} \approx 0.16$
- $w^{(4)} \approx 0.03$
- $w^{(5)} \approx 0.0001$

We can see that $x^{(5)} = 4$ has a very small weight because it is very unlikely to be drawn from the target distribution $p(x)$. Therefore, the weighted approximation $\hat{p}(x)$ becomes
$$
\hat{p}(x) = 0.43 \delta_{-1}(x) + 0.38 \delta_{0}(x) + 0.16 \delta_{1}(x) + 0.03 \delta_{2}(x) + 0.0001 \delta_{4}(x)
$$
We can take the expectation of $\hat{p}(x)$ following $\eqref{eq:expectation_particle_filter}$:
$$
\mathbb{E}_{x \sim \hat{p}(x)}[X] = 0.43 (-1) + 0.38 (0) + 0.16 (1) + 0.03 (2) + 0.0001 (4) \approx -0.21
$$
Which is somewhat close to the true expectation of $p(x)$ which is 0. The approximation can be improved by drawing more samples from the proposal distribution.

```execute-python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(0)

# target p(x) = N(0,1), proposal q(x) = N(2,4) = N(2, 2^2)
n = 60
x = np.random.normal(loc=2, scale=2, size=n)

def normal_pdf(x, mu, sigma):
    return np.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * np.sqrt(2 * np.pi))

p = normal_pdf(x, 0, 1)
q = normal_pdf(x, 2, 2)
w = (p / q)
w /= w.sum()

# plot p, q, and weighted particles
xx = np.linspace(-5, 8, 400)
plt.plot(xx, normal_pdf(xx, 0, 1), label='p(x) = N(0,1)')
plt.plot(xx, normal_pdf(xx, 2, 2), label='q(x) = N(2,4)')
plt.stem(x, w, basefmt=" ", label='weighted particles')
plt.legend()
plt.xlabel("x")
plt.ylabel("density / weight")
plt.title("Importance Sampling Example")

get_image(plt)
```

</details>

#### Resampling

After a while, often only a few particles have large weight, and most particles have almost zero weight. Then the approximation is effectively being carried by only a few samples.

Resampling fixes this by:

- duplicating particles with large weights
- removing particles with tiny weights

So it converts a weighted particle set into an unweighted one that still approximates the same distribution.

Given normalized weights $w^{(1)}, \ldots, w^{(n)}$ for the particles $x^{(1)}, \ldots, x^{(n)}$, we can lay them on the interval $[0, 1]$ as cumulative sums where each segment corresponds to the weight $w^{(i)}$.

To resample, we draw a random scalar:
$$
r \sim \mathrm{Uniform}\left(0, \frac{1}{n}\right).
$$
Then we construct $n$ equally spaced points starting from $r$:
$$
u^{(k)}=r+\frac{k-1}{n}, \quad k=1, \ldots, n .
$$
For each point $u^{(k)}$, we find the corresponding segment it falls into, and select the particle corresponding to that segment. 

```tikz
\begin{document}
\begin{tikzpicture}[x=12cm,y=1.4cm,>=stealth]

% Example cumulative positions:
% Make w^(2) large so that it gets sampled multiple times
\def\cOne{0.08}
\def\cTwo{0.70}
\def\cThree{0.78}
\def\cFour{0.86}

% Example resampling points for n=5
% r in [0,1/n] with 1/n = 0.20
\def\one{0.04}
\def\two{0.24}
\def\three{0.44}
\def\four{0.64}

% Main timeline
\draw[thick,->] (0,0) -- (1.05,0);

% Ticks and labels
\foreach \x/\lab in {
    0/{0},
    \cOne/{$w^{(1)}$},
    \cTwo/{$w^{(1)}+w^{(2)}$},
    1/{1}
}{
    \draw[thick] (\x,0.05) -- (\x,-0.05);
    \node[below] at (\x,-0.05) {\lab};
}

% Optional unlabeled tick near the end
\draw[thick] (\cFour,0.05) -- (\cFour,-0.05);

% Segment labels
\node[above] at ({\cOne/2},0) {$w^{(1)}$};
\node[above] at ({(\cOne+\cTwo)/2},0) {$w^{(2)}$};
\node[above] at ({(\cTwo+\cThree)/2},0) {$w^{(3)}$};
\node[above] at ({(\cFour+1)/2},0) {$w^{(n)}$};

% Boundary dots
\fill (\cOne,0) circle (0.8pt);
\fill (\cTwo,0) circle (0.8pt);
\fill (\cThree,0) circle (0.8pt);
\fill (\cFour,0) circle (0.8pt);

% Red dot for r
\fill[red] (\one,0.38) circle (1.2pt);
\node[above,red] at (\one,0.45) {$r$};

% Remaining red points
\fill[red] (\two,0.38) circle (1.2pt);
\fill[red] (\three,0.38) circle (1.2pt);
\fill[red] (\four,0.38) circle (1.2pt);
\fill[red] (0.84,0.38) circle (1.2pt);

\node[above,red] at (\two,0.55) {$u^{(2)}$};
\node[above,red] at (\three,0.55) {$u^{(3)}$};
\node[above,red] at (\four,0.55) {$u^{(4)}$};
\node[above,red] at (0.84,0.55) {$u^{(5)}$};

% Dashed lines down
\foreach \x in {\one,\two,\three,\four,0.84}{
    \draw[dashed,red!70] (\x,0.38) -- (\x,0);
}

% Curved red arrows showing jumps of size 1/n
\draw[->,red,thick] (\one,0.45) to[out=40,in=140] (\two,0.45);
\draw[->,red,thick] (\two,0.45) to[out=40,in=140] (\three,0.45);
\draw[->,red,thick] (\three,0.45) to[out=40,in=140] (\four,0.45);
\draw[->,red,thick] (\four,0.45) to[out=40,in=140] (0.84,0.45);

% Jump labels
\node[above,red] at ({(\one+\two)/2},0.75) {$\frac{1}{n}$};
\node[above,red] at ({(\two+\three)/2},0.75) {$\frac{1}{n}$};
\node[above,red] at ({(\three+\four)/2},0.75) {$\frac{1}{n}$};
\node[above,red] at ({(\four+0.84)/2},0.75) {$\frac{1}{n}$};

% Show which particles are selected
\node[below] at (\one,-0.65) {$x'^{(1)} = x^{(1)}$};
\node[below] at (\two,-0.65) {$x'^{(2)}= x^{(2)}$};
\node[below] at (\three,-0.65) {$x'^{(3)}= x^{(2)}$};
\node[below] at (\four,-0.65) {$x'^{(4)}= x^{(2)}$};
\node[below] at (0.84,-0.65) {$x'^{(5)}= x^{(4)}$};

\end{tikzpicture}
\end{document}
```

After resampling, we obtain a new set of particles
$$
\begin{equation} \label{eq:resampled_particles}
\left\{ x'^{(1)}, \ldots, x'^{(n)} \right\}
\end{equation}
$$
and each of them is assigned the uniform weight $\frac{1}{n}$. Now we have the following approximation of the target distribution:
$$
\begin{equation} \label{eq:resampled_approximation}
\hat{p}_{\text{resampled}}(x) = \frac{1}{n} \sum_{i=1}^n \delta_{x'^{(i)}}(x)
\end{equation}
$$

<details><summary>Example of Resampling</summary>

Continuing the previous example, suppose after importance sampling we obtained the normalized weights
$$
w^{(1)} \approx 0.43,\quad
w^{(2)} \approx 0.38,\quad
w^{(3)} \approx 0.16,\quad
w^{(4)} \approx 0.03,\quad
w^{(5)} \approx 0.0001.
$$
Thus, the weighted approximation is
$$
\hat{p}(x)
=
0.43 \delta_{-1}(x)
+0.38 \delta_{0}(x)
+0.16 \delta_{1}(x)
+0.03 \delta_{2}(x)
+0.0001 \delta_{4}(x).
$$

To perform systematic resampling with $n=5$, we first draw
$$
r \sim \mathrm{Uniform}\left(0,\frac{1}{5}\right).
$$
Suppose we draw
$$
r = 0.12.
$$
We then construct the equally spaced points
$$
u^{(1)} = 0.12,\quad
u^{(2)} = 0.32,\quad
u^{(3)} = 0.52,\quad
u^{(4)} = 0.72,\quad
u^{(5)} = 0.92.
$$

Next, we form the cumulative sums of the weights:
$$
c_1 = 0.43,\quad
c_2 = 0.43+0.38 = 0.81,\quad
c_3 = 0.97,\quad
c_4 = 1.00,\quad
c_5 = 1.00.
$$
So the intervals are approximately:
$$
[0,0.43) \rightarrow x^{(1)}=-1,
$$
$$
[0.43,0.81) \rightarrow x^{(2)}=0,
$$
$$
[0.81,0.97) \rightarrow x^{(3)}=1,
$$
$$
[0.97,0.9999) \rightarrow x^{(4)}=2,
$$
$$
[0.9999,1] \rightarrow x^{(5)}=4.
$$

Now we assign each resampling point to the interval it falls into:
- $u^{(1)} = 0.12 \in [0,0.43)$, so $x'^{(1)} = x^{(1)} = -1$
- $u^{(2)} = 0.32 \in [0,0.43)$, so $x'^{(2)} = x^{(1)} = -1$
- $u^{(3)} = 0.52 \in [0.43,0.81)$, so $x'^{(3)} = x^{(2)} = 0$
- $u^{(4)} = 0.72 \in [0.43,0.81)$, so $x'^{(4)} = x^{(2)} = 0$
- $u^{(5)} = 0.92 \in [0.81,0.97)$, so $x'^{(5)} = x^{(3)} = 1$

Therefore, after resampling we obtain the new particle set
$$
x'^{(1)}=-1,\quad
x'^{(2)}=-1,\quad
x'^{(3)}=0,\quad
x'^{(4)}=0,\quad
x'^{(5)}=1.
$$
Each resampled particle now has uniform weight
$$
w'^{(i)}=\frac{1}{5}, \quad i=1,\dots,5.
$$

So the resampled approximation becomes
$$
\hat{p}_{\mathrm{resampled}}(x)
=
\frac{1}{5}\delta_{-1}(x)
+\frac{1}{5}\delta_{-1}(x)
+\frac{1}{5}\delta_{0}(x)
+\frac{1}{5}\delta_{0}(x)
+\frac{1}{5}\delta_{1}(x).
$$
Combining repeated particles, this can also be written as
$$
\hat{p}_{\mathrm{resampled}}(x)
=
\frac{2}{5}\delta_{-1}(x)
+\frac{2}{5}\delta_{0}(x)
+\frac{1}{5}\delta_{1}(x).
$$

Using this resampled approximation, the expectation becomes
$$
\mathbb{E}_{x\sim \hat{p}_{\mathrm{resampled}}(x)}[X]
=
\frac{2}{5}(-1)
+\frac{2}{5}(0)
+\frac{1}{5}(1)
=
-0.2.
$$
This is very close to the weighted estimate before resampling, which was approximately $-0.21$.

We see that after resampling, the high-weight particles $-1$ and $0$ are duplicated, while the very low-weight particles $2$ and $4$ disappear. The result is an unweighted particle set that still approximates the same target distribution.

</details>

#### Particle Filter Algorithm

Consider the following nonlinear dynamical system:
$$
\begin{equation} \label{eq:particle_dynamical_system}
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
At time step $k = 0$, we can assume that we have a proposal distribution $p(x_0)$ that we can easily sample from, and we can initialize the particles as follows:
$$
x_{0|0}^{(i)} \sim p(x_0), \quad w_{0|0}^{(i)} = \frac{1}{n}, \quad i = 1, \ldots, n.
$$
For all future timesteps, we assume we have a set of particles with equal weights:
$$
\left\{ x_{k|k}^{(i)} \right\}_{i=1}^n, \quad \left\{ w_{k|k}^{(i)} = \frac{1}{n} \right\}_{i=1}^n
$$
that are used to approximate the posterior distribution:
$$
\hat{x}_{k|k} \sim \hat{p}(x_k \mid y_{1:k}) = \frac{1}{n} \sum_{i=1}^n \delta_{x_{k|k}^{(i)}}(x_k)
$$
Note the slight abuse of notation: we use $\hat{x}_{k|k}$ to denote the state according to $\hat{p}(x_k \mid y_{1:k})$, and we use $x_{k|k}^{(i)}$ to denote the $i$-th particle.

##### Propagation Step

Each particle is updated with the dynamics:
$$
\begin{equation} \label{eq:particle_propagation}
x_{k+1|k}^{(i)} = f\left(x_{k|k}^{(i)}, u_k\right) + \epsilon_k^{(i)}
\end{equation}
$$
And weights remain unchanged:
$$
w_{k+1|k}^{(i)} = w_{k|k}^{(i)} = \frac{1}{n}.
$$
So we have:
$$
\begin{equation} \label{eq:particle_propagation_approximation}
\hat{x}_{k+1|k} \sim \hat{p}\left(x_{k+1} \mid y_{1:k}\right) = \frac{1}{n} \sum_{i=1}^n \delta_{x_{k+1|k}^{(i)}}(x_{k+1})
\end{equation}
$$

##### Update Step

Given a new observation $y_{k+1}$, we update the weight of each particle using the likelihood of receiving that observation:
$$
\begin{equation} \label{eq:particle_update_weights}
w_{k+1|k+1}^{(i)} \propto  p\left(y_{k+1} \mid x_{k+1|k}^{(i)}\right )w_{k+1|k}^{(i)} 
\end{equation}
$$
The probability is computed from the observation noise model:
$$
\begin{align}
p\left(y_{k+1} \mid x_{k+1|k}^{(i)}\right)
&= p\left(\nu_{k+1} = y_{k+1} - g\left(x_{k+1|k}^{(i)}\right)\right) \\
&= p_{\nu}\left(y_{k+1} - g\left(x_{k+1|k}^{(i)}\right)\right).
\end{align}
$$
Given that the observation noise is Gaussian, the likelihood becomes
$$
\begin{equation} \label{eq:particle_likelihood_gaussian}
p\left(y_{k+1} \mid x_{k+1|k}^{(i)}\right)
=
\frac{1}{\sqrt{(2\pi)^p |Q|}}

\exp\left(
-\frac{1}{2}
\left(y_{k+1} - g\left(x_{k+1|k}^{(i)}\right)\right)^\top
Q^{-1}
\left(y_{k+1} - g\left(x_{k+1|k}^{(i)}\right)\right)
\right)
\end{equation}
$$
After computing these unnormalized weights, we normalize them so that they sum to 1:
$$
\begin{equation} \label{eq:particle_weight_normalization}
w_{k+1|k+1}^{(i)}
=
\frac{
p\left(y_{k+1} \mid x_{k+1|k}^{(i)}\right) w_{k+1|k}^{(i)}
}{
\sum_{j=1}^n
p\left(y_{k+1} \mid x_{k+1|k}^{(j)}\right) w_{k+1|k}^{(j)}
}.
\end{equation}
$$
We keep the particles unchanged
$$
x_{k+1|k+1}^{(i)} = x_{k+1|k}^{(i)}.
$$
So we have:
$$
\begin{equation} \label{eq:particle_update_approximation}
\hat{x}_{k+1|k+1} \sim \hat{p}\left(x_{k+1} \mid y_{1:k+1}\right) = \sum_{i=1}^n w_{k+1|k+1}^{(i)} \delta_{x_{k+1|k}^{(i)}}(x_{k+1})
\end{equation}
$$

##### Resampling Step

Given 
$$
\left\{ x_{k+1|k+1}^{(i)}, w_{k+1|k+1}^{(i)} \right\}_{i=1}^n,
$$ 
we perform resampling to get a new set of particles and normalized weights:
$$
\left\{ x_{k+1|k+1}'^{(i)}, w_{k+1|k+1}'^{(i)} \right\}_{i=1}^n, \quad w_{k+1|k+1}'^{(i)} = \frac{1}{n}.
$$ 
Then we simply repeat the propagation and update steps for the next time step.

#### Particle Filter Insights
Note that we modeled MDP as a stochastic dynamical system:
$$
\begin{equation}
\begin{aligned}
x_{k+1} \sim p\left(x_{k+1} \mid x_k, u_k\right) &\iff x_{k+1}=f\left(x_k, u_k\right)+\epsilon_k \\
y_k \sim p\left(y_k \mid x_k\right) &\iff y_k=g\left(x_k\right)+\nu_k
\end{aligned}
\end{equation}
$$
In the propagation step, our goal is to approximate target distribution:
$$
\text{target distribution} = p\left(x_{k+1} \mid y_1, \ldots, y_k\right).
$$
We use the previous posterior distribution as the proposal distribution:
$$
\text{proposal distribution} = p\left(x_k \mid y_1, \ldots, y_k\right),
$$
By definition $\eqref{eq:particle_filter_approximation}$, and the assumption that all particles have equal weights (after performing resampling), we have the following approximation of the proposal distribution:
$$
\begin{equation} \label{eq:proposal_approximation}
p\left(x_k \mid y_1, \ldots, y_k\right) \approx \frac{1}{n} \sum_{i=1}^n \delta_{x_{k|k}^{(i)}}(x_k).
\end{equation}
$$
If we have a particle $x$ that's supposed to approximate the target distribution, then we follow $\eqref{eq:importance_sampling_weights}$ to compute the unnormalized weight.
$$
\tilde{w}_{k+1|k+1}^{(i)} = \frac{p\left(x_{k+1} = x \mid y_1, \ldots, y_k\right)}{p\left(x_{k} = x \mid y_1, \ldots, y_k\right)}.
$$
First let's simplify the numerator:
$$
\begin{align}
p\left(x_{k+1}=x \mid y_{1:k}\right) &= \int p\left(x_{k+1}=x \mid x_k=x', y_{1:k}\right) p\left(x_k=x' \mid y_{1:k}\right)\, dx' \quad \text{by } \eqref{eq:total_probability_conditioned}
\\ &\stackrel{\text { Markov }}{=} \int p\left(x_{k+1}=x \mid x_k=x', u=u_k\right) p\left(x_k=x' \mid y_{1:k}\right) \, dx' \\
&\approx \frac{1}{n} \int p\left(x_{k+1}=x \mid x_k=x', u=u_k\right) \left(\sum_{i=1}^n \delta_{x_{k|k}^{(i)}}(x')\right) \, dx' \quad \text{by } \eqref{eq:proposal_approximation} \\
&\approx \frac{1}{n} \sum_{i=1}^n \int p\left(x_{k+1}=x \mid x_k=x^{\prime}, u=u_k\right) \delta_{x_{k \mid k}^{(i)}}\left(x^{\prime}\right) d x^{\prime} \\
&\approx \frac{1}{n} \sum_{i=1}^n p\left(x_{k+1}=x \mid x_k=x_{k \mid k}^{(i)}, u=u_k\right) \quad \text{by } \eqref{eq:dirac_delta_property}
\end{align}
$$ 

TODO: This is really hard.

## Rigid-body Transforms and Mapping

```tikz
\begin{document}
\begin{tikzpicture}[line cap=round,line join=round,scale=1.2]

% Parameters
\def\th{32}    % angle in degrees
\def\r{4.2}    % length of x_1
\def\ry{3.9}   % length of y_1

% Coordinates computed explicitly
\pgfmathsetmacro{\xx}{\r*cos(\th)}
\pgfmathsetmacro{\xy}{\r*sin(\th)}
\pgfmathsetmacro{\yx}{\ry*cos(\th+90)}
\pgfmathsetmacro{\yy}{\ry*sin(\th+90)}
\pgfmathsetmacro{\tx}{1.05*cos(\th/2)}
\pgfmathsetmacro{\ty}{1.05*sin(\th/2)-0.15}

% Origin
\coordinate (O) at (0,0);

% Frame 0
\draw[->] (O) -- (5.2,0) node[below right] {$x_0$};
\draw[->] (O) -- (0,3.6) node[above] {$y_0$};

% Frame 1
\draw[dashed,->] (O) -- (\xx,\xy) node[above right] {$x_1$};
\draw[dashed,->] (O) -- (\yx,\yy) node[above left] {$y_1$};

% Origin dot and label
\fill (O) circle (2pt);
\node[below left] at (O) {$o_0,o_1$};

% Angle arc
\draw[->] (0.9,0) arc (0:\th:0.9);
\node at (\tx,\ty) {$\theta$};

% Projection lines from x1 tip
\draw[dotted] (\xx,\xy) -- (\xx,0);
\draw[dotted] (\xx,\xy) -- (0,\xy);

% cos(theta) dimension
\draw[<->] (0,-0.8) -- node[below] {$\cos\theta$} (\xx,-0.8);

% sin(theta) dimension
\draw[<->] (\xx+0.55,0) -- node[right] {$\sin\theta$} (\xx+0.55,\xy);

\end{tikzpicture}
\end{document}
```

Let $R^0_1$ denote the rotation matrix that transforms coordinates from frame 1 to frame 0. In other words, $R$ expresses frame-1 things in terms of frame-0 coordinates. Let $v^0$ denote the coordinates of a vector $v$ in frame 0. In general, we use superscripts to denote the frame of reference.

For example, in the figure above, we have
$$
R^0_1 = \left[\begin{array}{cc}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{array}\right]
$$
which states that frame 1 is obtained by rotating frame 0 by $\theta$ degrees in the positive direction (counterclockwise).

### The Special Orthogonal Group

<blockquote class="definition">

**Properties of the Matrix Group** $SO(n)$
- $R \in S O(n)$
- $R^{-1} \in S O(n)$
- $R^{-1}=R^T$
- $R^0_2 = R^0_1 R^1_2$
- The columns (and therefore the rows) of $R$ are mutually orthogonal
- Each column (and therefore each row) of $R$ is a unit vector
- $\operatorname{det} R=1$

</blockquote>

Furthermore, rotations perserve inner products. For any vectors $x, y \in \mathbb{R}^n$ and any rotation matrix $R \in SO(n)$, we have
$$
\begin{equation} \label{eq:rotation_inner_product}
\left(Rx\right)^\top \left(Ry\right) = x^\top R^\top R y = x^\top y.
\end{equation}
$$
Rotations also preserve distances:
$$
\begin{equation} \label{eq:rotation_distance}
\|R x-R y\|=\|x-y\| .
\end{equation}
$$
We take the transpose of $R$ to transform coordinates in the opposite direction:
$$
\begin{equation} \label{eq:rotation_transform}
R^0_1  = \left(R^1_0\right) ^\top, \quad R^1_0 = \left(R^0_1\right) ^\top.
\end{equation}
$$

In $SO(3)$, we have the following basic rotation matrices:
$$
\begin{equation} \label{eq:basic_rotation_matrices}
R_{x, \theta}=\left[\begin{array}{ccc}
1 & 0 & 0 \\
0 & \cos \theta & -\sin \theta \\
0 & \sin \theta & \cos \theta
\end{array}\right], \quad
R_{y, \theta}=\left[\begin{array}{ccc}
\cos \theta & 0 & \sin \theta \\
0 & 1 & 0 \\
-\sin \theta & 0 & \cos \theta
\end{array}\right], \quad
R_{z, \theta}=\left[\begin{array}{ccc}
\cos \theta & -\sin \theta & 0 \\
\sin \theta & \cos \theta & 0 \\
0 & 0 & 1
\end{array}\right]
\end{equation}
$$
$R_{\alpha, \theta}$ denotes the rotation matrix for rotating by $\theta$ radians about the $\alpha$-axis.

### The Special Euclidean Group

While $SO(n)$ describes **rotations**, the **special Euclidean group** $SE(n)$ describes **rigid-body transformations**, that is, rotations together with translations. An element of $SE(n)$ has the form
$$
\begin{equation} \label{eq:SEn_definition}
T =
\left[\begin{array}{cc}
R & t \\
0 & 1
\end{array}\right],
\qquad R \in SO(n), \quad t \in \mathbb{R}^n.
\end{equation}
$$

Let $T^0_1$ denote the rigid-body transformation that transforms coordinates from frame 1 to frame 0. If $p^1$ denotes the coordinates of a point $p$ in frame 1, then
$$
\begin{equation} \label{eq:SE_point_transform}
p^0 = R^0_1 p^1 + t^0_1,
\end{equation}
$$
where $R^0_1$ is the rotational part and $t^0_1$ is the translation of the origin of frame 1 expressed in frame 0.

Using homogeneous coordinates,
$$
\bar{p} =
\left[\begin{array}{c}
p \\
1
\end{array}\right],
$$
we can write this as
$$
\begin{equation} \label{eq:SE_homogeneous_transform}
\bar{p}^0
=
T^0_1 \bar{p}^1
=
\left[\begin{array}{cc}
R^0_1 & t^0_1 \\
0 & 1
\end{array}\right]
\left[\begin{array}{c}
p^1 \\
1
\end{array}\right].
\end{equation}
$$

<blockquote class="definition">

**Properties of the Matrix Group** $SE(n)$
- $T \in SE(n)$
- $T^{-1} \in SE(n)$
- $T^0_2 = T^0_1 T^1_2$
- The rotational part of $T$ lies in $SO(n)$
- The translational part of $T$ lies in $\mathbb{R}^n$

</blockquote>

If
$$
T^0_1 =
\left[\begin{array}{cc}
R^0_1 & t^0_1 \\
0 & 1
\end{array}\right],
$$
then its inverse is
$$
\begin{equation} \label{eq:SE_inverse}
T^1_0 = \left(T^0_1\right)^{-1}
=
\left[\begin{array}{cc}
\left(R^0_1\right)^\top & -\left(R^0_1\right)^\top t^0_1 \\
0 & 1
\end{array}\right].
\end{equation}
$$

If
$$
T^0_1 =
\left[\begin{array}{cc}
R^0_1 & t^0_1 \\
0 & 1
\end{array}\right],
\qquad
T^1_2 =
\left[\begin{array}{cc}
R^1_2 & t^1_2 \\
0 & 1
\end{array}\right],
$$
then
$$
\begin{equation} \label{eq:SE_composition_parts}
T^0_2 = T^0_1 T^1_2
=
\left[\begin{array}{cc}
R^0_1 R^1_2 & R^0_1 t^1_2 + t^0_1 \\
0 & 1
\end{array}\right].
\end{equation}
$$

A point is transformed by both rotation and translation, but a vector is transformed only by rotation. Thus,
$$
\begin{equation} \label{eq:SE_vector_transform}
v^0 = R^0_1 v^1.
\end{equation}
$$

In $SE(3)$, an element has the form
$$
\begin{equation} \label{eq:SE3_definition}
T =
\left[\begin{array}{cc}
R & t \\
0 & 1
\end{array}\right],
\qquad R \in SO(3), \quad t \in \mathbb{R}^3.
\end{equation}
$$
Thus, $SO(3)$ describes **orientation**, while $SE(3)$ describes **pose**.

### Euler Angles

In $SO(3)$, any rotation matrix can be represented as a sequence of three basic rotations about coordinate axes. Such a representation is called an **Euler-angle parameterization**. In other words, rather than describing a rotation matrix $R \in SO(3)$ directly, we describe it using three angles together with a specified order of rotations.

A common convention in robotics is the **roll-pitch-yaw** convention, in which a rotation is written as
$$
\begin{equation} \label{eq:rpy_rotation}
\begin{aligned}
R(\alpha, \beta, \gamma) &= R_{z,\alpha} R_{y,\beta} R_{x,\gamma} \\
&= \left[\begin{array}{ccc}
\cos \alpha \cos \beta & \cos \sin \beta \sin \gamma-\sin \alpha \cos \gamma & \cos \alpha \sin \beta \cos \gamma+\sin \alpha \sin \gamma \\
\sin \alpha \cos \beta & \sin \alpha \sin \beta \sin \gamma+\cos \alpha \cos \gamma & \sin \alpha \sin \beta \cos \gamma-\cos \alpha \sin \gamma \\
-\sin \beta & \cos \beta \sin \gamma & \cos \beta \cos \gamma
\end{array}\right]
\end{aligned}
\end{equation}
$$
where
- $\alpha$ is the **roll** angle,
- $\beta$ is the **pitch** angle,
- $\gamma$ is the **yaw** angle.

Thus, the overall rotation is obtained by composing three basic rotations: first about the $x$-axis, then about the $y$-axis, and finally about the $z$-axis. Note that all three angles are defined with respect to the original coordinate axes, not the rotated axes.

We can also compute rotation matrices from Euler angles. Let
$$
\begin{equation} \label{eq:euler_angles_rotation_matrix}
\begin{aligned}
R(\alpha, \beta, \gamma) = \begin{bmatrix}
r_{11} & r_{12} & r_{13} \\
r_{21} & r_{22} & r_{23} \\
r_{31} & r_{32} & r_{33}
\end{bmatrix}
\end{aligned}
\end{equation}
$$
We can compute the entries of the rotation matrix as follows:
$$
\begin{equation} \label{eq:euler_angles_rotation_matrix_entries}
\begin{aligned}
& \alpha=\tan ^{-1}\left(r_{21} / r_{11}\right) \\
& \beta=\tan ^{-1}\left(-r_{31} / \sqrt{r_{32}^2+r_{33}^2}\right) \\
& \gamma=\tan ^{-1}\left(r_{32} / r_{33}\right) .
\end{aligned}
\end{equation}
$$

### Rodrigues' Formula

An angular velocity $\omega \in \mathbb{R}^3$ encodes:
$$
\text { axis of rotation }=\frac{\omega}{\|\omega\|}, \quad \text { angular speed }=\|\omega\| .
$$

Consider a point $r(t) \in \mathbb{R}^3$ that is being rotated about an axis defined by a unit vector $\omega \in \mathbb{R}^3$ with angular velocity $1$ rad/s.  The instantaneous linear velocity of the point is given by
$$
\begin{equation} \label{eq:rodrigues_velocity}
\dot{r}(t) = \omega \times r(t).
\end{equation}
$$
where $\times$ denotes the cross product of two vectors which is:
$$
\begin{equation} \label{eq:cross_product}
a \times b = \left[\begin{array}{c}
a_2 b_3 - a_3 b_2 \\
a_3 b_1 - a_1 b_3 \\
a_1 b_2 - a_2 b_1
\end{array}\right].
\end{equation}
$$
We can write the cross product as a matrix-vector product:
$$
\begin{equation} \label{eq:cross_product_matrix}
a \times b = \hat{a}b, \quad \text{where } \hat{a} = \left[\begin{array}{ccc}
0 & -a_3 & a_2 \\
a_3 & 0 & -a_1 \\
-a_2 & a_1 & 0
\end{array}\right].
\end{equation}
$$
$\hat{a}$ is called the **skew-symmetric matrix** of $a$. So we rewrite the velocity equation as
$$
\begin{equation} \label{eq:rodrigues_velocity_matrix}
\dot{r}(t) = \hat{\omega} r(t).
\end{equation}
$$
The solution to the differential equation $\eqref{eq:rodrigues_velocity_matrix}$ at time $t = \theta$  is given by:
$$
\begin{equation} \label{eq:rodrigues_formula}
r(\theta) = \mathrm{exp}(\hat{\omega} \theta) r(0),
\end{equation}
$$
where $\mathrm{exp}(\hat{\omega} \theta)$ is the matrix exponential of $\hat{\omega} \theta$. The matrix exponential can be computed using the Taylor series expansion:
$$
\begin{equation} \label{eq:matrix_exponential}
\mathrm{exp}(A) = I + A + \frac{A^2}{2!} + \frac{A^3}{3!} + \cdots = \sum_{k=0}^\infty \frac{A^k}{k!}.
\end{equation}
$$
We observe that the rotation about a fixed axis $\omega$ by $\theta$ can be represented as matrix:
$$
\begin{equation} \label{eq:rodrigues_rotation_matrix}
R = \mathrm{exp}(\hat{\omega} \theta), \quad \hat{\omega} \in \mathbb{R}^{3 \times 3}, \quad \theta \in \mathbb{R}.
\end{equation}
$$
We can expand this to get
$$
\begin{equation} \label{eq:rodrigues_rotation_matrix_expanded}
R = I + \hat{\omega} \sin \theta + \hat{\omega}^2 (1 - \cos \theta).
\end{equation}
$$
We can also go in the opposite direction and compute the axis and angle of rotation given a rotation matrix $R$:
$$
\begin{equation} \label{eq:rodrigues_axis_angle}
\begin{aligned}
\cos \theta & =\frac{\operatorname{tr}(R)-1}{2} \\
\hat{\omega} & =\frac{R-R^{\top}}{2 \sin \theta}
\end{aligned}
\end{equation}
$$

Similar to the differential equation $\eqref{eq:rodrigues_velocity_matrix}$, we can also write the differential equation for the rotation matrix itself:
$$
\begin{equation} \label{eq:rodrigues_rotation_matrix_differential}
\dot{R}(t) = \hat{\omega} R(t).
\end{equation}
$$
We can derive this by observing that
$$
\begin{align}
RR^\top &= I \\
\frac{d}{dt} RR^\top &= \frac{d}{dt} I \\
\dot{R} R^\top + R \dot{R}^\top &= 0, \quad \text{by } \frac{d}{d t}(A B)=\dot{A} B+A \dot{B} \\
S + S^\top &= 0
\end{align}
$$
Above we set $\dot{R} R^\top = S$, which is a skew-symmetric matrix. This gives
$$
\begin{align}
\dot{R} R^\top &= S \\
\dot{R} R^\top R &= S R \\
\dot{R} &= S R , \quad \text{by } R^\top R = I \text{ in } SO(3)\\
\end{align}
$$
Now consider a point in body frame $r \in \mathbb{R}^3$ that is represented as $r' = Rr$ in the world frame. We compute the time derivative of $r'$:
$$
\begin{align}
r' &= Rr \\
\frac{d}{dt} r' &= \dot{R} r + R \dot{r} ,\quad \text{by } \frac{d}{d t}(A x)=\dot{A} x+A \dot{x} \\
\dot{r}' &= \dot{R} r , \quad \text{since } \dot{r} = 0 \text{ $r$ is fixed in the body frame} \\
\dot{r}' &= SRr \\
\dot{r}' &= Sr'. \label{eq:rodrigues_velocity_matrix_derivation}
\end{align}
$$
We observe from $\eqref{eq:rodrigues_velocity_matrix}$ and combine with $\eqref{eq:rodrigues_velocity_matrix_derivation}$ to conclude that
$$
S = \hat{\omega}.
$$

Now, at a high level, if we are provided with an axis of rotation $\omega$ and an angle of rotation $\theta$, we can:
1. Compute the skew-symmetric matrix $\hat{\omega}$ using $\eqref{eq:cross_product_matrix}$.
2. Compute the rotation matrix $R$ with $\eqref{eq:rodrigues_rotation_matrix}$. 
3. Study the dynamics of $R$ with $\eqref{eq:rodrigues_rotation_matrix_differential}$.

Note that above we assumed $R$ is w.r.t the world frame and $\omega$ is w.r.t the world frame:
$$
\begin{equation} \label{eq:rodrigues_rotation_matrix_differential_world}
\dot{R}^{\text{world}}_{\text{body}} = \hat{\omega}^{\text{world}} R^{\text{world}}_{\text{body}}.
\end{equation}
$$
If we have $R$ w.r.t the world frame but $\omega$ w.r.t the body frame, then we can use the following formula:
$$
\begin{equation} \label{eq:rodrigues_rotation_matrix_differential_body}
\dot{R}^{\text{world}}_{\text{body}} = R^{\text{world}}_{\text{body}} \hat{\omega}^{\text{body}}.
\end{equation}
$$

### Quaternions

This is what we should use for any real problem in 3D.

A quaternion $q$ is a 4d vector
$$
q = \left(u_0, u_1, u_2, u_3\right) = \left(u_0, u\right) = u_0 + u_1 i + u_2 j + u_3 k,
$$
where $i, j, k$ are imaginary components that satisfy
$$
\begin{equation} \label{eq:quaternion_imaginary_components}
i^2 = j^2 = k^2 = ijk = -1.
\end{equation}
$$
A unit quaternion is a quaternion with norm 1:
$$
\|q\| = \sqrt{u_0^2 + u_1^2 + u_2^2 + u_3^2} = 1 \text{ if unit quaternion}.
$$
and they are used to represent rotations in 3D. 

**Quaternion to Axis-Angle**

The quaternion $q = \left(u_0, u\right)$ corresponds to a counterclockwise rotation of angle $\theta$ about a unit vector $\omega$:
$$
\begin{equation} \label{eq:quaternion_axis_angle}
q = \left(\cos \frac{\theta}{2}, \omega \sin \frac{\theta}{2}\right).
\end{equation}
$$
We can also compute the inverse of a quaternion:
$$
\begin{equation} \label{eq:quaternion_inverse}
q^{-1} = \left(u_0, -u\right),
\end{equation}
$$
where $q^{-1}$ corresponds to a rotation of angle $-\theta$ about the same axis $\omega$.

We can see that the identity rotation corresponds to the quaternion:
$$
\begin{equation} \label{eq:quaternion_identity}
\text{identity rotation} = (1, 0, 0, 0).
\end{equation}
$$

Note that the same rotation can be represented by two different unit quaternions:
$$
\begin{equation} \label{eq:quaternion_double_cover}
q = \left(\cos \frac{\theta}{2}, \omega \sin \frac{\theta}{2}\right)
\quad \text{and} \quad
-q = \left(-\cos \frac{\theta}{2}, -\omega \sin \frac{\theta}{2}\right).
\end{equation}
$$
Thus, unit quaternions provide a double-cover of $SO(3)$. We can see this trivally by observing from $\eqref{eq:rodrigues_rotation_matrix}$ that:
$$
R = \mathrm{exp}\left(\hat{\omega} \theta\right) = \mathrm{exp}\left(\left(-\hat{\omega}\right) \left(-\theta\right)\right)
$$

**Multiplication of Quaternions**

Given two quaternions $q_1 = \left(u_0, u\right)$ and $q_2 = \left(v_0, v\right)$, we can compute their product as follows:
$$
\begin{equation} \label{eq:quaternion_multiplication}
q_1 q_2 = (u_0, u) \cdot (v_0, v) = \left(u_0 v_0 - u^\top v, u_0 v + v_0 u + u \times v\right).
\end{equation}
$$

**Pure Quaternions**

A pure quaternion is a quaternion with zero scalar part:
$$
\text{pure quaternion} = (0, u_1, u_2, u_3).
$$
We can store a standard 3d vector $x \in \mathbb{R}^3$ as a pure quaternion:
$$
\begin{equation} \label{eq:quaternion_pure_quaternion}
(0, x) = (0, x_1, x_2, x_3).
\end{equation}
$$
To rotate a vector $x$ by a unit quaternion $q$, we can use the following formula:
$$
\begin{equation} \label{eq:quaternion_rotation}
q \cdot (0, x) \cdot q^{-1} = (0, R(q) x),
\end{equation}
$$
where $\cdot$ denotes quaternion multiplication and $R(q)$ is the rotation matrix corresponding to the quaternion $q$.

Suppose we have $x^\text{body} \in \mathbb{R}^3$ that we want to transform to the world frame $x^\text{world}$. Suppose $q^\text{world}_\text{body}$ is the unit quaternion that represents the rotation from the body frame to the world frame. Then we can compute $x^\text{world}$ as follows:
$$
(0, x^\text{world}) = q^\text{world}_\text{body} \cdot (0, x^\text{body}) \cdot \left(q^\text{world}_\text{body}\right)^{-1}.
$$
To go the other way, if we have $x^\text{world}$ and want to transform it to the body frame, we can compute
$$
(0, x^\text{body}) = \left(q^\text{world}_\text{body}\right)^{-1} \cdot (0, x^\text{world}) \cdot q^\text{world}_\text{body}.
$$
We observe that:
$$
\begin{equation} \label{eq:quaternion_rotation_inverse}
\left(q_{\text {body}}^{\text {world}}\right)^{-1}=q_{\text {world}}^{\text {body}}
\end{equation}
$$

Similar to $\eqref{eq:rodrigues_rotation_matrix_differential_world}$ and $\eqref{eq:rodrigues_rotation_matrix_differential_body}$, we can also write the differential equation for the quaternion itself given the angular velocity in the body frame $\omega^\text{body} \in \mathbb{R}^3$:
$$
\begin{equation} \label{eq:quaternion_differential}
\dot{q}^{\text{world}}_{\text{body}} = \frac{1}{2} q^{\text{world}}_{\text{body}} \cdot (0, \omega^{\text{body}}).
\end{equation}
$$
If we are instead given the angular velocity in the world frame $\omega^\text{world} \in \mathbb{R}^3$, then we can compute the quaternion differential as follows:
$$
\begin{equation} \label{eq:quaternion_differential_world}
\dot q^{\text{world}}_{\text{body}}
=
\frac{1}{2}\,
(0,\omega^{\text{world}})
\cdot
q^{\text{world}}_{\text{body}}.
\end{equation}
$$

### Occupancy Grids
An occupancy grid is a discretized representation of the environment, where each cell in the grid can be either occupied or free. We have the following assumptions:

**Assumption 1: Each cell is either occupied or free.**

Let the probability that the cell $m_i$ is occupied be $p(m_i)$.

**Assumption 2: The world is static, so the occupancy of each cell does not change over time.**

**Assumption 3: The occupancy of each cell is independent of the occupancy of other.**

This means if cells are denoted by a vector $m = (m_1, m_2, \ldots, m_n)$, then we have
$$
p(m) = \prod_{i=1}^n p(m_i).
$$

Suppose the robot pose (position and orientation) is given by the sequence $x_1, \ldots, x_k$. While proceeding along this sequence, the robot receives $y_1, \ldots, y_k$ as sensor measurements. Our goal is to estimate the state of each cell $m_i \in \{0, 1\}$ :
$$
\mathrm{P}(m \mid x_{1:k}, y_{1:k}) = \prod_{i=1}^n \mathrm{P}(m_i \mid x_{1:k}, y_{1:k}).
$$
We have the following for each cell $m_i$:
$$
\begin{align}
\mathrm{P}\left(m_i \mid x_{1: k}, y_{1: k}\right) &\stackrel{\text { Bayes rule }}{=} \frac{\mathrm{P}\left(y_k \mid m_i, y_{1: k-1}, x_{1: k}\right) \mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k}\right)}{\mathrm{P}\left(y_k \mid y_{1: k-1}, x_{1: k}\right)} \\
&\stackrel{\text { Markov }}{=}\frac{\textcolor{red}{\mathrm{P}\left(y_k \mid m_i, x_k\right)} \mathrm{P}\left(m_i \mid y_{1: k-1}, \textcolor{red}{x_{1: k-1}}\right)}{\mathrm{P}\left(y_k \mid y_{1: k-1}, x_{1: k}\right)}  \label{eq:occupancy_grid_bayes_markov_some_eq} \\
&\stackrel{\text { Bayes rule }}{=}  \frac{\textcolor{red}{\mathrm{P}\left(m_i \mid y_k, x_k\right) \mathrm{P}\left(y_k \mid x_k \right)} \mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k-1}\right)}{\textcolor{red}{\mathrm{P}\left(m_i \mid x_k \right)}\mathrm{P}\left(y_k \mid y_{1: k-1}, x_{1: k}\right)}  \\
&\stackrel{\text { Independence }}{=}  \frac{\mathrm{P}\left(m_i \mid y_k, x_k\right) \mathrm{P}\left(y_k \mid x_k \right) \mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k-1}\right)}{\textcolor{red}{\mathrm{P}\left(m_i \right)}\mathrm{P}\left(y_k \mid y_{1: k-1}, x_{1: k}\right)}.
\end{align} 
$$
$\eqref{eq:occupancy_grid_bayes_markov_some_eq}$'s term $\mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k}\right) = \mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k-1}\right)$ because of the Markov assumption that the current measurement $y_k$ only depends on the current pose $x_k$ and the state of the cell $m_i$, and does not depend on the previous measurements and poses.

We have a similar expression for the opposite probability
$$
\begin{equation} \label{eq:occupancy_grid_opposite_probability}
\mathrm{P}\left(\neg m_i \mid x_{1: k}, y_{1: k}\right) =\frac{\mathrm{P}\left(\neg m_i \mid y_k, x_k\right) \mathrm{P}\left(y_k \mid x_k \right) \mathrm{P}\left( \neg m_i \mid y_{1: k-1}, x_{1: k-1}\right)}{\mathrm{P}\left(\neg m_i \right)\mathrm{P}\left(y_k \mid y_{1: k-1}, x_{1: k}\right)}.
\end{equation}
$$
We take the ratio of the two probabilities to get
$$
\begin{align}
\frac{\mathrm{P}\left(m_i \mid x_{1: k}, y_{1: k}\right)}{\mathrm{P}\left(\neg m_i \mid x_{1: k}, y_{1: k}\right)} & =\frac{\mathrm{P}\left(m_i \mid y_k, x_k\right)}{\mathrm{P}\left(\neg m_i \mid y_k, x_k\right)} \frac{\mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k-1}\right)}{\mathrm{P}\left(\neg m_i \mid y_{1: k-1}, x_{1: k-1}\right)} \frac{\mathrm{P}\left(\neg m_i\right)}{\mathrm{P}\left(m_i\right)} \\
& =\underbrace{\frac{\mathrm{P}\left(m_i \mid y_k, x_k\right)}{1-\mathrm{P}\left(m_i \mid y_k, x_k\right)}}_{\text {uses observation } y_k} \underbrace{\frac{\mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k-1}\right)}{1-\mathrm{P}\left(m_i \mid y_{1: k-1}, x_{1: k-1}\right)}}_{\text {recursive term }} \underbrace{\frac{1-\mathrm{P}\left(m_i\right)}{\mathrm{P}\left(m_i\right)}}_{\text {prior }} \label{eq:occupancy_grid_log_odds_ratio}.
\end{align}
$$
This is a recursive formula and note that the first term uses the current observation $y_k$ while the second term uses the previous observations $y_{1:k-1}$. The log-odds-ratio of the probability $p(x)$ of a binary variable $x$ is defined as
$$
\begin{equation} \label{eq:log_odds_ratio}
l(x)=\log \frac{p(x)}{1-p(x)}, \text { and } p(x)=1-\frac{1}{1+e^{l(x)}}
\end{equation}
$$
So the expression $\eqref{eq:occupancy_grid_log_odds_ratio}$ can be rewritten in terms of log-odds-ratio as follows:
$$
\begin{equation} \label{eq:occupancy_grid_log_odds_ratio_recursive}
l\left(m_i \mid y_{1: k}, x_{1: k}\right)=l\left(m_i \mid y_k, x_k\right)+l\left(m_i \mid y_{1: k-1}, x_{1: k-1}\right)-l\left(m_i\right) .
\end{equation}
$$
We use the odds ratio to create the map. The term $l\left(m_i \mid y_k, x_k\right)$ is called the **sensor model**, and we can use the entire expression in $\eqref{eq:occupancy_grid_log_odds_ratio_recursive}$ to recursively update the log-odds-ratio of the occupancy of each cell as we receive new observations.

### 3D Occupancy Grids

We use Quad Trees and Octrees to represent 2D and 3D occupancy grids respectively. The following is a representation of a Quad Tree, where the blue lines represent the first split, the red lines represent the second split, and the green lines represent the third split. Each data point is stored in a leaf node, and we have **at most one data point per leaf node**.

```tikz
\begin{document}
\begin{tikzpicture}[scale=1]

% Outer boundary
\draw[thick] (0,0) rectangle (8,8);

% First split (Level 1) - Blue
\draw[thick, blue] (4,0) -- (4,8);
\draw[thick, blue] (0,4) -- (8,4);

% Second split (Level 2 - NE and SW quadrants) - Red
\draw[thick, red] (6,4) -- (6,8);
\draw[thick, red] (4,6) -- (8,6);
\draw[thick, red] (2,0) -- (2,4);
\draw[thick, red] (0,2) -- (4,2);

% Third split (Level 3 - SW-SW quadrant) - Green
\draw[thick, green] (1,0) -- (1,2);
\draw[thick, green] (0,1) -- (2,1);

% Data Points (Max 1 per region)
% NW Quadrant
\filldraw (2, 6) circle (2pt) node[above right] {$p_1$};

% NE Quadrant
\filldraw (5, 7) circle (2pt) node[above right] {$p_2$};
\filldraw (4.5, 4.5) circle (2pt) node[above right] {$p_3$};
\filldraw (7, 5) circle (2pt) node[above right] {$p_4$};

% SW Quadrant
\filldraw (3, 3) circle (2pt) node[above right] {$p_5$};
\filldraw (0.5, 1.5) circle (2pt) node[above right] {$p_6$};
\filldraw (1.5, 0.5) circle (2pt) node[above right] {$p_7$};
\filldraw (3, 1) circle (2pt) node[above right] {$p_8$};

% SE Quadrant
\filldraw (6, 2) circle (2pt) node[above right] {$p_9$};

% Main quadrant labels
\node[gray] at (0.5, 7.5) {NW};
\node[gray] at (7.5, 7.5) {NE};
\node[gray] at (0.5, 3.5) {SW};
\node[gray] at (7.5, 3.5) {SE};

\end{tikzpicture}
\end{document}
```
An equivalent representation of the Quad Tree can be drawn with a tree structure

```tikz
\begin{document}
\begin{tikzpicture}[scale=0.9]

% Root Node
\node[draw, circle, minimum size=0.5cm] (root) at (6, 10) {};

% LEVEL 1 (Blue Splits)
\node[draw, rectangle, minimum size=0.5cm] (nw) at (2, 8) {$p_1$};
\node[draw, circle, minimum size=0.5cm] (ne) at (5, 8) {};
\node[draw, circle, minimum size=0.5cm] (sw) at (8, 8) {};
\node[draw, rectangle, minimum size=0.5cm] (se) at (11, 8) {$p_9$};

\draw[blue, thick] (root) -- (nw);
\draw[blue, thick] (root) -- (ne);
\draw[blue, thick] (root) -- (sw);
\draw[blue, thick] (root) -- (se);

% Labels for Level 1 branches
\node[blue] at (3.5, 9.2) {NW};
\node[blue] at (5.2, 9.2) {NE};
\node[blue] at (7.2, 9.2) {SW};
\node[blue] at (8.7, 9.2) {SE};

% LEVEL 2 - NE Quadrant (Red Splits)
\node[draw, rectangle, minimum size=0.5cm] (nenw) at (3.5, 6) {$p_2$};
\node[draw, rectangle, dashed, minimum size=0.5cm] (nene) at (4.5, 6) {$\emptyset$};
\node[draw, rectangle, minimum size=0.5cm] (nesw) at (5.5, 6) {$p_3$};
\node[draw, rectangle, minimum size=0.5cm] (nese) at (6.5, 6) {$p_4$};

\draw[red, thick] (ne) -- (nenw);
\draw[red, thick] (ne) -- (nene);
\draw[red, thick] (ne) -- (nesw);
\draw[red, thick] (ne) -- (nese);

% LEVEL 2 - SW Quadrant (Red Splits)
\node[draw, rectangle, dashed, minimum size=0.5cm] (swnw) at (7.5, 6) {$\emptyset$};
\node[draw, rectangle, minimum size=0.5cm] (swne) at (8.5, 6) {$p_5$};
\node[draw, circle, minimum size=0.5cm] (swsw) at (9.5, 6) {};
\node[draw, rectangle, minimum size=0.5cm] (swse) at (10.5, 6) {$p_8$};

\draw[red, thick] (sw) -- (swnw);
\draw[red, thick] (sw) -- (swne);
\draw[red, thick] (sw) -- (swsw);
\draw[red, thick] (sw) -- (swse);

% LEVEL 3 - SW-SW Quadrant (Green Splits)
\node[draw, rectangle, minimum size=0.5cm] (swswnw) at (8, 4) {$p_6$};
\node[draw, rectangle, dashed, minimum size=0.5cm] (swswne) at (9, 4) {$\emptyset$};
\node[draw, rectangle, dashed, minimum size=0.5cm] (swswsw) at (10, 4) {$\emptyset$};
\node[draw, rectangle, minimum size=0.5cm] (swswse) at (11, 4) {$p_7$};

\draw[green, thick] (swsw) -- (swswnw);
\draw[green, thick] (swsw) -- (swswne);
\draw[green, thick] (swsw) -- (swswsw);
\draw[green, thick] (swsw) -- (swswse);

\end{tikzpicture}
\end{document}
```

An Octree is a similar data structure for 3D occupancy grids, where each node has 8 children instead of 4. The same principle of at most one data point per leaf node applies to Octrees as well.

```tikz
\begin{document}

\begin{tikzpicture}[
    x={(1cm,0cm)},
    y={(0cm,1cm)},
    z={(0.4cm,0.3cm)},
    scale=0.8,
    line cap=round,
    line join=round,
    visible/.style={black, line width=1pt},
    hidden/.style={black!55, dashed, line width=0.8pt},
    lOne/.style={blue!80, line width=0.9pt},
    lOneHidden/.style={blue!60, dashed, line width=0.7pt},
    lTwo/.style={red!80, line width=0.9pt},
    lTwoHidden/.style={red!60, dashed, line width=0.7pt},
    lThree/.style={green!50!black, line width=0.9pt},
    lThreeHidden/.style={green!50!black, dashed, line width=0.7pt},
    pt/.style={circle, fill=black, inner sep=2.2pt}
]

% =========================
% Outer Bounding Cube
% =========================

% Front face (solid)
\draw[visible] (0,0,0) -- (8,0,0) -- (8,8,0) -- (0,8,0) -- cycle;

% Back face (dashed)
\draw[hidden] (0,0,8) -- (8,0,8) -- (8,8,8) -- (0,8,8) -- cycle;

% Connecting edges
\draw[hidden] (0,0,0) -- (0,0,8);
\draw[visible] (8,0,0) -- (8,0,8);
\draw[visible] (8,8,0) -- (8,8,8);
\draw[visible] (0,8,0) -- (0,8,8);

% =========================
% Level 1 Split (Blue)
% =========================

% X = 4 plane
\draw[lOne]       (4,0,0) -- (4,8,0);
\draw[lOneHidden] (4,0,8) -- (4,8,8);
\draw[lOneHidden] (4,0,0) -- (4,0,8);
\draw[lOne]       (4,8,0) -- (4,8,8);

% Y = 4 plane
\draw[lOne]       (0,4,0) -- (8,4,0);
\draw[lOneHidden] (0,4,8) -- (8,4,8);
\draw[lOneHidden] (0,4,0) -- (0,4,8);
\draw[lOne]       (8,4,0) -- (8,4,8);

% Z = 4 plane
\draw[lOneHidden] (0,0,4) -- (8,0,4);
\draw[lOne]       (0,8,4) -- (8,8,4);
\draw[lOneHidden] (0,0,4) -- (0,8,4);
\draw[lOne]       (8,0,4) -- (8,8,4);

% Internal crosshairs (dashed so they are less dominant)
\draw[lOneHidden] (4,4,0) -- (4,4,8);
\draw[lOneHidden] (4,0,4) -- (4,8,4);
\draw[lOneHidden] (0,4,4) -- (8,4,4);

% =========================
% Level 2 Split (Red)
% Top-NorthEast Octant: X,Y,Z in [4,8]
% =========================

\draw[lTwo]       (6,4,4) -- (6,8,4);
\draw[lTwoHidden] (6,4,8) -- (6,8,8);
\draw[lTwoHidden] (6,4,4) -- (6,4,8);
\draw[lTwo]       (6,8,4) -- (6,8,8);

\draw[lTwo]       (4,6,4) -- (8,6,4);
\draw[lTwoHidden] (4,6,8) -- (8,6,8);
\draw[lTwoHidden] (4,6,4) -- (4,6,8);
\draw[lTwo]       (8,6,4) -- (8,6,8);

\draw[lTwoHidden] (4,4,6) -- (8,4,6);
\draw[lTwo]       (4,8,6) -- (8,8,6);
\draw[lTwoHidden] (4,4,6) -- (4,8,6);
\draw[lTwo]       (8,4,6) -- (8,8,6);

% Internal crosshairs
\draw[lTwoHidden] (6,6,4) -- (6,6,8);
\draw[lTwoHidden] (6,4,6) -- (6,8,6);
\draw[lTwoHidden] (4,6,6) -- (8,6,6);

% =========================
% Level 2 Split (Red)
% Bottom-SouthWest Octant: X,Y,Z in [0,4]
% =========================

\draw[lTwo]       (2,0,0) -- (2,4,0);
\draw[lTwoHidden] (2,0,4) -- (2,4,4);
\draw[lTwoHidden] (2,0,0) -- (2,0,4);
\draw[lTwo]       (2,4,0) -- (2,4,4);

\draw[lTwo]       (0,2,0) -- (4,2,0);
\draw[lTwoHidden] (0,2,4) -- (4,2,4);
\draw[lTwoHidden] (0,2,0) -- (0,2,4);
\draw[lTwo]       (4,2,0) -- (4,2,4);

\draw[lTwoHidden] (0,0,2) -- (4,0,2);
\draw[lTwo]       (0,4,2) -- (4,4,2);
\draw[lTwoHidden] (0,0,2) -- (0,4,2);
\draw[lTwo]       (4,0,2) -- (4,4,2);

% Internal crosshairs
\draw[lTwoHidden] (2,2,0) -- (2,2,4);
\draw[lTwoHidden] (2,0,2) -- (2,4,2);
\draw[lTwoHidden] (0,2,2) -- (4,2,2);

% =========================
% Level 3 Split (Green)
% Bottom-SW sub-octant: X,Y,Z in [0,2]
% =========================

\draw[lThree]       (1,0,0) -- (1,2,0);
\draw[lThreeHidden] (1,0,2) -- (1,2,2);
\draw[lThreeHidden] (1,0,0) -- (1,0,2);
\draw[lThree]       (1,2,0) -- (1,2,2);

\draw[lThree]       (0,1,0) -- (2,1,0);
\draw[lThreeHidden] (0,1,2) -- (2,1,2);
\draw[lThreeHidden] (0,1,0) -- (0,1,2);
\draw[lThree]       (2,1,0) -- (2,1,2);

\draw[lThreeHidden] (0,0,1) -- (2,0,1);
\draw[lThree]       (0,2,1) -- (2,2,1);
\draw[lThreeHidden] (0,0,1) -- (0,2,1);
\draw[lThree]       (2,0,1) -- (2,2,1);

% Internal crosshairs
\draw[lThreeHidden] (1,1,0) -- (1,1,2);
\draw[lThreeHidden] (1,0,1) -- (1,2,1);
\draw[lThreeHidden] (0,1,1) -- (2,1,1);

% =========================
% Data Points
% =========================

\node[pt,label=above right:$p_1$] at (2,6,6) {};
\node[pt,label=above right:$p_2$] at (5,7,7) {};
\node[pt,label=above right:$p_3$] at (4.5,4.5,5) {};
\node[pt,label=above right:$p_4$] at (7,5,6) {};
\node[pt,label=above right:$p_5$] at (3,3,3) {};
\node[pt,label=above right:$p_6$] at (0.5,1.5,1.5) {};
\node[pt,label=above right:$p_7$] at (1.5,0.5,0.5) {};
\node[pt,label=above right:$p_8$] at (3,1,2) {};
\node[pt,label=above right:$p_9$] at (6,2,2) {};

\end{tikzpicture}

\end{document}
```

### Neural radiance field (NeRF)

![](https://cdn.mathpix.com/snip/images/UazWpNpumlkmSQCcg1FblcwZFfHBUsc1B3EL5MrGTJg.original.fullsize.png)

We can represent a 3D scene using a neural network that takes in a 3D coordinate and a viewing direction and outputs the color and density at that point in the scene. Given a 3D location $x \in \mathbb{R}^3$ and viewing direction $(\theta, \phi)$, we predict the color $c \in \mathbb{R}^3$ and density $\sigma \in \mathbb{R}$ of the scene at that location. In practice, we express the viewing direction as a unit vector $d \in \mathbb{R}^3$:
$$
\begin{equation} \label{eq:nerf_function}
F_\Theta(x, d) = (c, \sigma).
\end{equation}
$$

Although the viewing direction is sometimes written using two angles $(\theta,\phi)$, in practice it is often represented as a 3D unit vector $d$. This still corresponds to only two degrees of freedom, since rotating around the ray itself does not change the viewing direction. Thus, roll is irrelevant for a single ray direction.

NeRF encourages multiview consistency by making the density depend only on position:
$$
\sigma = \sigma(x),
$$
while allowing the color to depend on both the position and the viewing direction:
$$
c = c(x,d).
$$
This is important because the geometry of the scene should not depend on the camera viewpoint, while the observed color may change with viewpoint due to view-dependent effects such as specular highlights.

After predicting the color and density for points in the scene, we use **volume rendering** to render an image from a given camera pose. A camera ray is parameterized by
$$
\begin{equation} \label{eq:camera_ray}
r(t) = o + td,
\end{equation}
$$
where $o \in \mathbb{R}^3$ is the camera center, $d \in \mathbb{R}^3$ is the ray direction, and $t \in \mathbb{R}$ is the distance along the ray. The near and far bounds of the ray are denoted by $t_n$ and $t_f$.

The expected color $C(r)$ of a ray is given by
$$
\begin{equation} \label{eq:volume_rendering}
C(r) = \int_{t_n}^{t_f} T(t)\,\sigma(r(t))\,c(r(t), d)\,dt,
\quad \text{where } 
T(t) = \exp\left(-\int_{t_n}^{t} \sigma(r(s))\,ds\right).
\end{equation}
$$

Here:

- $r(t) \in \mathbb{R}^3$ is the 3D point sampled along the ray at depth $t$,
- $\sigma(r(t)) \in \mathbb{R}$ is the density at that point,
- $c(r(t), d) \in \mathbb{R}^3$ is the RGB color at that point when viewed from direction $d$,
- $T(t) \in \mathbb{R}$ is the **transmittance**, which represents the probability that the ray has traveled from $t_n$ to $t$ without being absorbed earlier.

Intuitively, the rendered color is obtained by accumulating the color contributions of all points along the ray, weighted by both how much density they have and how likely it is that the ray reaches them.

Since the integral in $\eqref{eq:volume_rendering}$ is continuous, in practice NeRF approximates it using a finite set of sampled depths
$$
t_1, t_2, \dots, t_N
$$
along each ray. Let
$$
x_i = r(t_i) = o + t_i d
$$
denote the sampled 3D points. The network predicts
$$
(c_i, \sigma_i) = F_\Theta(x_i, d),
$$
where $c_i \in \mathbb{R}^3$ and $\sigma_i \in \mathbb{R}$.

Define the distance between adjacent samples by
$$
\delta_i = t_{i+1} - t_i.
$$
Then the discrete volume rendering equation is
$$
\begin{equation} \label{eq:discrete_nerf_rendering}
\hat{C}(r) = \sum_{i=1}^{N} w_i c_i,
\end{equation}
$$
where the weight of the $i$-th sample is
$$
\begin{equation} \label{eq:nerf_weights}
w_i = T_i \alpha_i,
\end{equation}
$$
with
$$
\begin{equation} \label{eq:nerf_alpha}
\alpha_i = 1 - \exp(-\sigma_i \delta_i),
\end{equation}
$$
and
$$
\begin{equation} \label{eq:nerf_transmittance_discrete}
T_i = \prod_{j=1}^{i-1} (1-\alpha_j).
\end{equation}
$$

Here, $\alpha_i$ can be interpreted as the probability that the ray terminates at sample $i$, and $T_i$ is the probability that the ray has survived through all earlier samples. Therefore, $w_i$ is the probability that sample $i$ is the first point along the ray that contributes to the observed color.

To train the model, we render the color $\hat{C}(r)$ for rays corresponding to pixels in the training images and compare them to the ground-truth pixel colors $C(r)$. The network parameters $\Theta$ are optimized by minimizing a reconstruction loss such as mean squared error:
$$
\begin{equation} \label{eq:nerf_loss}
\mathcal{L}(\Theta) = \sum_{r \in \mathcal{R}} \left\| \hat{C}(r) - C(r) \right\|_2^2,
\end{equation}
$$
where $\mathcal{R}$ is the set of rays sampled from the training images.

A practical issue is that an MLP has difficulty representing high-frequency scene details when given raw coordinates directly. To address this, NeRF applies a **positional encoding** to both the spatial coordinates and the viewing directions before feeding them into the network. For a scalar input $p$, the positional encoding is
$$
\gamma(p) = \left(\sin(2^0\pi p), \cos(2^0\pi p), \sin(2^1\pi p), \cos(2^1\pi p), \dots, \sin(2^{L-1}\pi p), \cos(2^{L-1}\pi p)\right).
$$
Applying this elementwise to the components of $x$ and $d$ allows the network to represent fine spatial and angular variation much more effectively.

In summary, NeRF learns a continuous function that maps a 3D point and viewing direction to a color and density, and then uses differentiable volume rendering to synthesize images. By training on posed images of a scene, the model learns both the geometry and appearance of the scene and can render novel views from unseen camera positions.


## Dynamic Programming

### Optimal Control Problem

Let us denote the state of a robot by $x_k \in \mathcal{X} \subseteq \mathbb{R}^n$ at the $k^{\text{th}}$ time step. We can change this state using a control input $u_k \in \mathcal{U} \subseteq \mathbb{R}^p$. The state evolves according to a dynamics function
$$
\begin{equation} \label{eq:optimal_control_dynamics}
x_{k+1} = f_k(x_k, u_k), \quad k = 0, 1, \ldots, T-1,
\end{equation}
$$
for some initial state $x_0$. Suppose we have a cost function
$$
\begin{equation} \label{eq:optimal_control_cost_function}
q_k(x_k, u_k) \in \mathbb{R},
\end{equation}
$$
which gives a scalar output for each state and control input at time step $k$. We also have a terminal cost function
$$
\begin{equation} \label{eq:optimal_control_terminal_cost}
q_f(x_T) \in \mathbb{R},
\end{equation}
$$
which gives a cost for the final state at time step $T$. $q_f(x_T)$ is high if the final state is undesirable (e.g. colliding with an obstacle) and low if the final state is desirable (e.g. reaching a goal).


<blockquote class="definition">

The **optimal control problem** is to find the sequence of control inputs $u_0, u_1, \ldots, u_{T-1}$ that minimizes the total cost of the trajectory:
$$
\begin{equation} \label{eq:optimal_control_problem}
\begin{aligned}
J(x_0; u_0, \ldots, u_{T-1}) &= q_f(x_T) + \sum_{k=0}^{T-1} q_k(x_k, u_k) \\
J^*(x_0) &= \min_{u_0, \ldots, u_{T-1}} J(x_0; u_0, \ldots, u_{T-1})
\end{aligned}
\end{equation}
$$
where $J^*(x_0)$ is the optimal cost starting from state $x_0$. 

</blockquote>

If state space $\mathcal{X}$ and control space $\mathcal{U}$ are discrete, we can solve this problem with a shortest path algorithm such as Dijkstra's. 

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, ->, auto]

  % --- State Nodes ---
  \begin{scope}[every node/.style={circle, draw, minimum size=0.9cm, inner sep=1pt}]
      
      % Start Node
      \node (S) at (0, 0) {$x_0$};
      
      % Layer 1
      \node (s11) at (3, 2.5) {$x_1^{(1)}$};
      \node (s12) at (3, 0.5) {$x_1^{(2)}$};
      \node (s13) at (3, -2.5) {$x_1^{(|\mathcal{X}|)}$};
      
      % Layer k
      \node (sk1) at (7, 2.5) {$x_k^{(1)}$};
      \node (sk2) at (7, 0.5) {$x_k^{(2)}$};
      \node (sk3) at (7, -2.5) {$x_k^{(|\mathcal{X}|)}$};
      
      % Layer T-1
      \node (sT1-1) at (11, 2.5) {$x_{T-1}^{(1)}$};
      \node (sT1-2) at (11, 0.5) {$x_{T-1}^{(2)}$};
      \node (sT1-3) at (11, -2.5) {$x_{T-1}^{(|\mathcal{X}|)}$};
      
      % Layer T (New full layer)
      \node (sT1) at (14, 2.5) {$x_T^{(1)}$};
      \node (sT2) at (14, 0.5) {$x_T^{(2)}$};
      \node (sT3) at (14, -2.5) {$x_T^{(|\mathcal{X}|)}$};
      
      % Final Sink Node (Single node after Layer T)
      \node (t) at (17, 0) {$t$};
      
  \end{scope}

  % --- Text Labels and Ellipses ---
  
  % Start and Sink Labels
  \node at (0, -3.5) {\small Start};
  \node at (17, -3.5) {\small Sink};

  % Vertical ellipses to represent |X| nodes per layer
  \node at (3, -0.8) {$\vdots$};
  \node at (7, -0.8) {$\vdots$};
  \node at (11, -0.8) {$\vdots$};
  \node at (14, -0.8) {$\vdots$};

  % Layer Headers
  \node at (3, 3.4) {\textbf{Stage $1$}};
  
  \node at (7, 3.4) {\textbf{Stage $k$}};
  
  \node at (11, 3.4) {\textbf{Stage $T-1$}};
  
  % New Stage T Header
  \node at (14, 3.4) {\textbf{Stage $T$}};

  % Horizontal dots representing intermediate stages
  \node (d11) at (5, 2.5) {$\dots$};
  \node (d12) at (5, 0.5) {$\dots$};
  \node (d13) at (5, -2.5) {$\dots$};

  \node (d21) at (9, 2.5) {$\dots$};
  \node (d22) at (9, 0.5) {$\dots$};
  \node (d23) at (9, -2.5) {$\dots$};

  % --- Edges (Transitions) ---
  
  % Start to Layer 1 (Thick edges)
  \draw[thick] (S) -- (s11);
  \draw[thick] (S) -- (s12);
  \draw[thick] (S) -- (s13);

  % Layer 1 to Layer k through Intermediate Dots (thin, grey all-to-all mesh)
  \begin{scope}[every path/.style={black!30, thin}]
      % Layer 1 to Intermediate Dots
      \draw (s11) -- (d11); \draw (s11) -- (d12); \draw (s11) -- (d13);
      \draw (s12) -- (d11); \draw (s12) -- (d12); \draw (s12) -- (d13);
      \draw (s13) -- (d11); \draw (s13) -- (d12); \draw (s13) -- (d13);
      
      % Intermediate Dots to Layer k
      \draw (d11) -- (sk1); \draw (d11) -- (sk2); \draw (d11) -- (sk3);
      \draw (d12) -- (sk1); \draw (d12) -- (sk2); \draw (d12) -- (sk3);
      \draw (d13) -- (sk1); \draw (d13) -- (sk2); \draw (d13) -- (sk3);
      
      % Layer k to Intermediate Dots 2
      \draw (sk1) -- (d21); \draw (sk1) -- (d22); \draw (sk1) -- (d23);
      \draw (sk2) -- (d21); \draw (sk2) -- (d22); \draw (sk2) -- (d23);
      \draw (sk3) -- (d21); \draw (sk3) -- (d22); \draw (sk3) -- (d23);
      
      % Intermediate Dots 2 to Layer T-1
      \draw (d21) -- (sT1-1); \draw (d21) -- (sT1-2); \draw (d21) -- (sT1-3);
      \draw (d22) -- (sT1-1); \draw (d22) -- (sT1-2); \draw (d22) -- (sT1-3);
      \draw (d23) -- (sT1-1); \draw (d23) -- (sT1-2); \draw (d23) -- (sT1-3);

      % Layer T-1 to Layer T (New full layer)
      \draw (sT1-1) -- (sT1); \draw (sT1-1) -- (sT2); \draw (sT1-1) -- (sT3);
      \draw (sT1-2) -- (sT1); \draw (sT1-2) -- (sT2); \draw (sT1-2) -- (sT3);
      \draw (sT1-3) -- (sT1); \draw (sT1-3) -- (sT2); \draw (sT1-3) -- (sT3);
  \end{scope}

  % Layer T to Final Sink (Thick, annotated edges)
  \draw[thick] (sT1) -- node[midway, above=0.3cm] {$q_f\left(x_T^{(1)}\right)$} (t);
  \draw[thick] (sT2) -- node[midway, above=0.4cm, left=-0.6cm] {$q_f\left(x_T^{(2)}\right)$} (t);
  \draw[thick] (sT3) -- node[midway, below=0.3cm] {$q_f\left(x_T^{(|\mathcal{X}|)}\right)$} (t);

\end{tikzpicture}
\end{document}
```

We model $\eqref{eq:optimal_control_problem}$ as a shortest path problem in a directed acyclic graph (DAG) where each node corresponds to a state at a particular time step, and edges correspond to the deterministic transitions defined by $\eqref{eq:optimal_control_dynamics}$. The cost of each edge is given by the cost function:
$$
\mathrm{cost}(x_k, x_{k+1}) = q_k(x_k, u_k),
$$
where $u_k$ is the control input that causes the transition from $x_k$ to $x_{k+1}$. We create an artificial sink node denoted as $t$ and add edges from each node in the final layer (corresponding to time step $T$) to $t$ with cost $q_f(x_T)$. 

We can now solve $\eqref{eq:optimal_control_problem}$ with a shortest path algorithm between the start node $x_0$ and the sink node $t$.

#### Dijkstra's Algorithm

<blockquote class="algorithm">

**Dijkstra's Algorithm**

Let $Q$ be the set of unvisited nodes and $S$ the set of visited nodes. For each node $x$, define $\operatorname{dist}(x)$ to be the current tentative distance from the source node $x_0$ to $x$. The algorithm proceeds as follows:

1. Initialize

    $$
    \operatorname{dist}(x_0) = 0, \quad \operatorname{dist}(x) = \infty \text{ for all } x \neq x_0,
    $$
    and set $Q$ to contain all nodes and $S$ to be empty.

2. At each iteration, choose the unvisited node $v \in Q$ with minimum $\operatorname{dist}(v)$:

    $$
    v = \arg\min_{x \in Q} \operatorname{dist}(x).
    $$
    Remove $v$ from $Q$ and add it to $S$. $\operatorname{dist}(v)$ now represents the shortest path from $x_0$ to $v$.

3. For every neighbor $u$ of $v$ reachable by a directed edge $(v, u)$, perform the relaxation step:

    $$
    \begin{aligned}
    \text{if } \operatorname{dist}(u) > \operatorname{dist}(v) + \operatorname{cost}(v, u): \\
    \operatorname{dist}(u) \leftarrow \operatorname{dist}(v) + \operatorname{cost}(v, u).
    \end{aligned}
    $$

4. Continue this procedure until all nodes have been visited, or until the destination node has been removed from $Q$.

</blockquote>

At termination, $\operatorname{dist}(x)$ gives the shortest-path cost from $x_0$ to $x$ for each node $x$. In particular, the value at the terminal node yields the optimal cost.

<details><summary>Example of Optimal Control Problem with Dijkstra's Algorithm</summary>

Suppose we have the following environment:

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, auto, node distance=2.5cm]

  % --- State Nodes ---
  \tikzstyle{state}=[circle, draw, minimum size=1.2cm, inner sep=1pt]
  \tikzstyle{mud}=[circle, draw, dashed, fill=orange!20, minimum size=1.2cm, inner sep=1pt]
  
  % Row 0
  \node[state, very thick] (00) at (0, 0) {$x^{(0,0)}$};
  \node[state] (01) at (3, 0) {$x^{(0,1)}$};
  \node[state] (02) at (6, 0) {$x^{(0,2)}$};
  
  % Row 1
  \node[state] (10) at (0, -3) {$x^{(1,0)}$};
  \node[mud]   (11) at (3, -3) {$x^{(1,1)}$};
  \node[state, very thick] (12) at (6, -3) {$x^{(1,2)}$};

  % --- Labels ---
  \node[above=0.2cm] at (00.north) {\textbf{Start}};
  \node[below=0.2cm] at (11.south) {\textbf{Mud}};
  \node[below=0.2cm] at (12.south) {\textbf{Goal}};

  % --- Edges (Transitions) ---
  % Horizontal Row 0
  \draw[->] (00) to[bend left=15] node[above] {\scriptsize 1} (01);
  \draw[->] (01) to[bend left=15] node[below] {\scriptsize 1} (00);
  \draw[->] (01) to[bend left=15] node[above] {\scriptsize 1} (02);
  \draw[->] (02) to[bend left=15] node[below] {\scriptsize 1} (01);

  % Horizontal Row 1
  \draw[->, red, thick] (10) to[bend left=15] node[above] {\scriptsize 5} (11); % Into mud
  \draw[->] (11) to[bend left=15] node[below] {\scriptsize 1} (10); % Out of mud
  \draw[->] (11) to[bend left=15] node[above] {\scriptsize 1} (12); % Out of mud
  \draw[->, red, thick] (12) to[bend left=15] node[below] {\scriptsize 5} (11); % Into mud

  % Vertical Col 0
  \draw[->] (00) to[bend left=15] node[right] {\scriptsize 1} (10);
  \draw[->] (10) to[bend left=15] node[left] {\scriptsize 1} (00);
  
  % Vertical Col 1
  \draw[->, red, thick] (01) to[bend left=15] node[right] {\scriptsize 5} (11); % Into mud
  \draw[->] (11) to[bend left=15] node[left] {\scriptsize 1} (01); % Out of mud

  % Vertical Col 2
  \draw[->] (02) to[bend left=15] node[right] {\scriptsize 1} (12);
  \draw[->] (12) to[bend left=15] node[left] {\scriptsize 1} (02);

\end{tikzpicture}
\end{document}
```

In this environment, we have a grid of states with two rows and three columns. The agent starts at $x^{(0,0)}$ and wants to reach the goal state $x^{(1,2)}$. The agent can move horizontally or vertically between adjacent states. However, there is a mud state $x^{(1,1)}$ that incurs a high cost of 5 to enter. 

We can model this as an optimal control problem with state space
$$
\mathcal{X} = \{x^{(0,0)}, x^{(0,1)}, x^{(0,2)}, x^{(1,0)}, x^{(1,1)}, x^{(1,2)}\},
$$
and control space
$$
\mathcal{U} = \{\text{up}, \text{down}, \text{left}, \text{right}\}.
$$
The dynamics function $f$ is defined by the transitions between states, and the cost function $q_k$ assigns a cost of 1 for normal transitions and a cost of 5 for transitions into the mud state. We have the initial and goal states:
$$
x_0 = x^{(0,0)}, \quad x_T = x^{(1,2)}.
$$
We set the terminal cost function $q_f\left(x_T^{(1,2)}\right) = 0$ for reaching the goal and $q_f(x_T^{(i, j)}) = \infty$ for all other states to ensure that only paths that end at the goal are considered valid.

We can model this as a shortest path problem in a DAG:

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, ->, auto]

  % --- Styling ---
  \tikzstyle{state}=[circle, draw, minimum size=0.9cm, inner sep=1pt]
  \tikzstyle{mud}=[circle, draw, dashed, fill=orange!20, minimum size=0.9cm, inner sep=1pt]
  \tikzstyle{normal_edge}=[black!50, thin]
  \tikzstyle{cost_edge}=[red, thick]
  \tikzstyle{optimal_node}=[circle, draw=blue, very thick, minimum size=0.9cm, inner sep=1pt]
  \tikzstyle{optimal_edge}=[blue, very thick]
  
  % --- Stage k=0 ---
  \node[optimal_node] (S) at (0, 0) {$x_0$};
  \node[below=0.2cm] at (S.south) {\small Start ($0,0$)};
  \node[above=0.2cm] at (0, 4.5) {\textbf{Stage $k=0$}};

  % --- Stage k=1 ---
  \node[state] (1_00) at (4, 4.5) {$x_1^{(0,0)}$};
  \node[optimal_node] (1_01) at (4, 2.7) {$x_1^{(0,1)}$};
  \node[state] (1_02) at (4, 0.9) {$x_1^{(0,2)}$};
  \node[state] (1_10) at (4, -0.9) {$x_1^{(1,0)}$};
  \node[mud]   (1_11) at (4, -2.7) {$x_1^{(1,1)}$};
  \node[state] (1_12) at (4, -4.5) {$x_1^{(1,2)}$};
  \node[above=0.2cm] at (1_00.north) {\textbf{Stage $k=1$}};

  % --- Stage k=2 ---
  \node[state] (2_00) at (9, 4.5) {$x_2^{(0,0)}$};
  \node[state] (2_01) at (9, 2.7) {$x_2^{(0,1)}$};
  \node[optimal_node] (2_02) at (9, 0.9) {$x_2^{(0,2)}$};
  \node[state] (2_10) at (9, -0.9) {$x_2^{(1,0)}$};
  \node[mud]   (2_11) at (9, -2.7) {$x_2^{(1,1)}$};
  \node[state] (2_12) at (9, -4.5) {$x_2^{(1,2)}$};
  \node[above=0.2cm] at (2_00.north) {\textbf{Stage $k=2$}};

  % --- Stage k=3 (Terminal States) ---
  \node[state] (3_00) at (14, 4.5) {$x_3^{(0,0)}$};
  \node[state] (3_01) at (14, 2.7) {$x_3^{(0,1)}$};
  \node[state] (3_02) at (14, 0.9) {$x_3^{(0,2)}$};
  \node[state] (3_10) at (14, -0.9) {$x_3^{(1,0)}$};
  \node[mud]   (3_11) at (14, -2.7) {$x_3^{(1,1)}$};
  \node[optimal_node] (3_12) at (14, -4.5) {$x_3^{(1,2)}$};
  \node[above=0.2cm] at (3_00.north) {\textbf{Stage $T=3$}};

  % --- Final Sink Node ---
  \node[optimal_node] (t) at (18, 0) {$t$};
  \node[below=0.2cm] at (t.south) {\small Final Sink};

  % --- Edges (Transitions) ---

  % Stage 0 to Stage 1 (From 0,0 can only go Right or Down)
  \draw[optimal_edge] (S) -- node[above left, text=blue] {\scriptsize \textbf{1}} (1_01);
  \draw[thick] (S) -- node[below left] {\scriptsize 1} (1_10);

  % Stage 1 to Stage 2
  \begin{scope}[every path/.style={normal_edge}]
      % From x_0,0
      \draw (1_00) -- (2_01); \draw (1_00) -- (2_10);
      % From x_0,1
      \draw (1_01) -- (2_00);  
      \draw[cost_edge] (1_01) -- node[pos=0.75, above right=-2pt, inner sep=1pt] {\scriptsize 5} (2_11); % Into mud
      % From x_0,2
      \draw (1_02) -- (2_01); \draw (1_02) -- (2_12);
      % From x_1,0
      \draw (1_10) -- (2_00); 
      \draw[cost_edge] (1_10) -- node[pos=0.75, below left=-2pt, inner sep=1pt] {\scriptsize 5} (2_11); % Into mud
      % From x_1,1 (Mud)
      \draw (1_11) -- (2_01); \draw (1_11) -- (2_10); \draw (1_11) -- (2_12);
      % From x_1,2
      \draw (1_12) -- (2_02);
      \draw[cost_edge] (1_12) -- node[pos=0.75, below right=-2pt, inner sep=1pt] {\scriptsize 5} (2_11); % Into mud
  \end{scope}
  % Stage 1 to Stage 2 (Optimal Path extracted from scope to render on top)
  \draw[optimal_edge] (1_01) -- node[pos=0.25, above, text=blue] {\scriptsize \textbf{1}} (2_02);

  % Stage 2 to Stage 3 (Identical grid dynamics)
  \begin{scope}[every path/.style={normal_edge}]
      % From x_0,0
      \draw (2_00) -- (3_01); \draw (2_00) -- (3_10);
      % From x_0,1
      \draw (2_01) -- (3_00); \draw (2_01) -- (3_02); 
      \draw[cost_edge] (2_01) -- node[pos=0.75, above right=-2pt, inner sep=1pt] {\scriptsize 5} (3_11); % Into mud
      % From x_0,2
      \draw (2_02) -- (3_01); 
      % From x_1,0
      \draw (2_10) -- (3_00); 
      \draw[cost_edge] (2_10) -- node[pos=0.75, below left=-2pt, inner sep=1pt] {\scriptsize 5} (3_11); % Into mud
      % From x_1,1 (Mud)
      \draw (2_11) -- (3_01); \draw (2_11) -- (3_10); \draw (2_11) -- (3_12);
      % From x_1,2
      \draw (2_12) -- (3_02);
      \draw[cost_edge] (2_12) -- node[pos=0.75, below right=-2pt, inner sep=1pt] {\scriptsize 5} (3_11); % Into mud
  \end{scope}
  % Stage 2 to Stage 3 (Optimal Path extracted from scope to render on top)
  \draw[optimal_edge] (2_02) -- node[pos=0.25, above right=-2pt, text=blue] {\scriptsize \textbf{1}} (3_12);

  % Stage 3 to Terminal Sink (t)
  \begin{scope}[every path/.style={thick}]
      \draw (3_00) -- node[pos=0.6, above, sloped] {\scriptsize $\infty$} (t);
      \draw (3_01) -- node[pos=0.6, above, sloped] {\scriptsize $\infty$} (t);
      \draw (3_02) -- node[pos=0.6, above, sloped] {\scriptsize $\infty$} (t);
      \draw (3_10) -- node[pos=0.6, below, sloped] {\scriptsize $\infty$} (t);
      \draw (3_11) -- node[pos=0.6, below, sloped] {\scriptsize $\infty$} (t);
  \end{scope}
  % Stage 3 to Terminal Sink (Optimal Path extracted)
  \draw[optimal_edge] (3_12) -- node[pos=0.6, below, sloped, text=blue] {\scriptsize \textbf{0}} (t);

\end{tikzpicture}
\end{document}
```

We can run Dijkstra's algorithm on this graph to find the shortest path from the start node $x_0$ to the goal node $x_T$. 

```execute-python
import heapq

# 1. Dijkstra's Algorithm
def dijkstra(graph, start, goal):
    dist = {n: float('inf') for n in graph}
    parent = {n: None for n in graph}

    dist[start] = 0
    pq = [(0, start)]
    visited = set()

    while pq:
        d, u = heapq.heappop(pq)
        if u == goal: break
        if u in visited: continue
        visited.add(u)

        for v, cost in graph.get(u, []):
            if d + cost < dist[v]:
                dist[v], parent[v] = d + cost, u
                heapq.heappush(pq, (dist[v], v))
                
    return dist, parent

# 2. Layered Graph Building (Time-Unrolled DAG with Sink Node)
ROWS, COLS, T = 2, 3, 3

# Nodes are (time_step, row, col), plus a special sink node 't'
START = (0, 0, 0)
SINK = 't'
TARGET_GRID_STATE = (1, 2)
MUD = (1, 1)

# Initialize graph for all valid states up to terminal stage T, and add sink
graph = {(k, r, c): [] for k in range(T + 1) for r in range(ROWS) for c in range(COLS)}
graph[SINK] = [] 

# Add dynamics: Stage k to Stage k+1
for k in range(T):
    for r in range(ROWS):
        for c in range(COLS):
            u = (k, r, c)
            
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]: # Up, Down, Left, Right
                nr, nc = r + dr, c + dc
                if 0 <= nr < ROWS and 0 <= nc < COLS:
                    v = (k + 1, nr, nc) # Edges strictly move FORWARD to next stage
                    cost = 5 if (nr, nc) == MUD else 1
                    graph[u].append((v, cost))

# Add terminal costs: Stage T to Sink 't'
for r in range(ROWS):
    for c in range(COLS):
        u = (T, r, c)
        # q_f(x_T) is 0 if we reached the physical goal, infinity otherwise
        terminal_cost = 0 if (r, c) == TARGET_GRID_STATE else float('inf')
        graph[u].append((SINK, terminal_cost))

# 3. Solve and Reconstruct Path
dist, parent = dijkstra(graph, START, SINK)

path, curr = [], SINK
while curr is not None:
    path.append(curr)
    curr = parent[curr]

print(f"Optimal Total Cost: {dist[SINK]}")
print(f"Optimal Path: {path[::-1]}")
```

</details>

<details><summary>Discussion of Dijkstra's Algorithm</summary>

Standard Dijkstra assumes the following conditions:

- Graphs can contain cycles.
- Edge weights must be strictly non-negative (adding a step always increases the total cost).
- A priority queue and a visited set are required to explore the cheapest paths safely without getting stuck in infinite loops.

Since we are working with a time-unrolled DAG, we can relax some of these assumptions:
- The graph is acyclic, so we do not need a visited set to prevent cycles.
- We can have negative edge weights (e.g., if we had a reward instead of a cost) as long as there are no negative cycles, which is guaranteed by the DAG structure.
- We can use a simple queue instead of a priority queue, since we can process nodes in topological order without worrying about revisiting nodes.

</details>

### Principle of Dynamic Programming

The principle of dynamic programming is a formalization of the idea behind running Dijkstra's algorithm backwards (from the sink to the source). The core concept is that the _remainder of the optimal path must itself be optimal_. 

We can prove this assertion by contradiction. Suppose we find the optimal control sequence $(u^*_0, u^*_1, \ldots, u^*_{T-1})$ for our optimal control problem. Because our system is deterministic, this control sequence results in a unique optimal sequence of states $(x_0, x^*_1, \ldots, x^*_T)$, where each successive state is $x^*_{k+1} = f_k(x^*_k, u^*_k)$. The principle of optimality states that if one starts from an intermediate state $x^*_k$ at time $k$ and wishes to minimize the remaining "cost-to-go":
$$
\text{Cost-to-go} = q_f(x_T) + q_k(x^*_k, u_k) + \sum_{i=k + 1}^{T-1} q_i(x_i, u_i)
$$
over the remaining sequence of controls $(u_k, u_{k+1}, \ldots, u_{T-1})$, the optimal control sequence for this truncated problem is exactly the tail end of our original solution: $(u^*_k, \ldots, u^*_{T-1})$.

If this truncated sequence were not optimal starting from $x^*_k$, there would exist some other optimal sequence of controls for the truncated problem, say $(v^*_k, \ldots, v^*_{T-1})$. If we then took the original sequence for the first $k-1$ steps and spliced it with this new, better sequence for time-steps $k, \dots, T-1$, the overall trajectory would have a strictly lower total cost. This contradicts our initial premise that $(u^*_0, \ldots, u^*_{T-1})$ was the optimal sequence for the full problem.

The essence of dynamic programming is to solve the larger, original problem by sequentially solving these truncated sub-problems from the end to the beginning. At each iteration, we construct the optimal cost-to-go functions:
$$
J^*_T(x_T), J^*_{T-1}(x_{T-1}), \ldots, J^*_0(x_0)
$$
starting from $J^*_T$ and proceeding backwards. Mathematically, this algorithm looks as follows:

<blockquote class="algorithm">

**Optimal Control Dynamic Programming**

1. Initialize the terminal cost for all states $x \in \mathcal{X}$:
    $$
    J^*_T(x) = q_f(x)
    $$
2. Iterate backwards for $k = T-1, \ldots, 0$, setting:
    $$
    \begin{equation} \label{eq:dp_recursion}
    J^*_k(x) = \min_{u_k \in \mathcal{U}} \left[ q_k(x, u_k) + J^*_{k+1}(f_k(x, u_k)) \right]
    \end{equation}
    $$
    for all $x \in \mathcal{X}$.

</blockquote>
    
After running this algorithm, we obtain the optimal cost-to-go $J^*_0(x)$ for each state $x \in \mathcal{X}$. Specifically, $J^*_0(x_0)$ gives us the optimal cost for our initial state. If we simply record the minimizer $u^*_k$ that satisfied the equation at each step $k$, we also recover the optimal control sequence $(u^*_0, u^*_1, \ldots, u^*_{T-1})$.

<details><summary>Example of Dynamic Programming</summary>

Following the same environment as before, we can solve for the optimal cost-to-go functions using dynamic programming starting from the terminal stage $T=3$:

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, ->, auto]

  % --- Styling ---
  \tikzstyle{state}=[circle, draw, minimum size=0.9cm, inner sep=1pt]
  \tikzstyle{mud}=[circle, draw, dashed, fill=orange!20, minimum size=0.9cm, inner sep=1pt]
  \tikzstyle{normal_edge}=[black!50, thin]
  \tikzstyle{cost_edge}=[red, thick]
  \tikzstyle{optimal_node}=[circle, draw=blue, very thick, minimum size=0.9cm, inner sep=1pt]
  \tikzstyle{optimal_edge}=[blue, very thick]
  \tikzset{j_val/.style={text=violet, font=\bfseries}}

  
  % --- Stage k=0 ---
  \node[optimal_node, label={[j_val]above:$\mathbf{J^*_0=3}$}] (S) at (0, 0) {$x_0$};
  \node[below=0.2cm] at (S.south) {\small Start ($0,0$)};
  \node[above=0.6cm] at (0, 4.5) {\textbf{Stage $k=0$}};

  % --- Stage k=1 (With DP Cost-to-go values) ---
  \node[state, label={[j_val]above:$J^*_1=\infty$}] (1_00) at (4, 4.5) {$x_1^{(0,0)}$};
  \node[optimal_node, label={[j_val]above:$\mathbf{J^*_1=2}$}] (1_01) at (4, 2.7) {$x_1^{(0,1)}$};
  \node[state, label={[j_val]above:$J^*_1=\infty$}] (1_02) at (4, 0.9) {$x_1^{(0,2)}$};
  \node[state, label={[j_val]above:$\mathbf{J^*_1=6}$}] (1_10) at (4, -0.9) {$x_1^{(1,0)}$};
  \node[mud, label={[j_val]above:$J^*_1=\infty$}]   (1_11) at (4, -2.7) {$x_1^{(1,1)}$};
  \node[state, label={[j_val]above:$\mathbf{J^*_1=2}$}] (1_12) at (4, -4.5) {$x_1^{(1,2)}$};
  \node[above=0.6cm] at (1_00.north) {\textbf{Stage $k=1$}};

  % --- Stage k=2 (With DP Cost-to-go values) ---
  \node[state, label={[j_val]above:$J^*_2=\infty$}] (2_00) at (9, 4.5) {$x_2^{(0,0)}$};
  \node[state, label={[j_val]above:$J^*_2=\infty$}] (2_01) at (9, 2.7) {$x_2^{(0,1)}$};
  \node[optimal_node, label={[j_val]above:$\mathbf{J^*_2=1}$}] (2_02) at (9, 0.9) {$x_2^{(0,2)}$};
  \node[state, label={[j_val]above:$J^*_2=\infty$}] (2_10) at (9, -0.9) {$x_2^{(1,0)}$};
  \node[mud, label={[j_val]above:$\mathbf{J^*_2=1}$}]   (2_11) at (9, -2.7) {$x_2^{(1,1)}$};
  \node[state, label={[j_val]above:$J^*_2=\infty$}] (2_12) at (9, -4.5) {$x_2^{(1,2)}$};
  \node[above=0.6cm] at (2_00.north) {\textbf{Stage $k=2$}};

  % --- Stage k=3 (Terminal States with DP Cost-to-go values) ---
  \node[state, label={[j_val]above:$J^*_3=\infty$}] (3_00) at (14, 4.5) {$x_3^{(0,0)}$};
  \node[state, label={[j_val]above:$J^*_3=\infty$}] (3_01) at (14, 2.7) {$x_3^{(0,1)}$};
  \node[state, label={[j_val]above:$J^*_3=\infty$}] (3_02) at (14, 0.9) {$x_3^{(0,2)}$};
  \node[state, label={[j_val]above:$J^*_3=\infty$}] (3_10) at (14, -0.9) {$x_3^{(1,0)}$};
  \node[mud, label={[j_val]above:$J^*_3=\infty$}]   (3_11) at (14, -2.7) {$x_3^{(1,1)}$};
  \node[optimal_node, label={[j_val]above:$\mathbf{J^*_3=0}$}] (3_12) at (14, -4.5) {$x_3^{(1,2)}$};
  \node[above=0.6cm] at (3_00.north) {\textbf{Stage $T=3$}};

  % --- Final Sink Node ---
  \node[optimal_node] (t) at (18, 0) {$t$};
  \node[below=0.2cm] at (t.south) {\small Final Sink};

  % --- Edges (Transitions) ---

  % Stage 0 to Stage 1 (From 0,0 can only go Right or Down)
  \draw[optimal_edge] (S) -- node[above left, text=blue] {\scriptsize \textbf{1}} (1_01);
  \draw[thick] (S) -- node[below left] {\scriptsize 1} (1_10);

  % Stage 1 to Stage 2
  \begin{scope}[every path/.style={normal_edge}]
      % From x_0,0
      \draw (1_00) -- (2_01); \draw (1_00) -- (2_10);
      % From x_0,1
      \draw (1_01) -- (2_00);  
      \draw[cost_edge] (1_01) -- node[pos=0.75, above right=-2pt, inner sep=1pt] {\scriptsize 5} (2_11); % Into mud
      % From x_0,2
      \draw (1_02) -- (2_01); \draw (1_02) -- (2_12);
      % From x_1,0
      \draw (1_10) -- (2_00); 
      \draw[cost_edge] (1_10) -- node[pos=0.75, below left=-2pt, inner sep=1pt] {\scriptsize 5} (2_11); % Into mud
      % From x_1,1 (Mud)
      \draw (1_11) -- (2_01); \draw (1_11) -- (2_10); \draw (1_11) -- (2_12);
      % From x_1,2
      \draw (1_12) -- (2_02);
      \draw[cost_edge] (1_12) -- node[pos=0.75, below right=-2pt, inner sep=1pt] {\scriptsize 5} (2_11); % Into mud
  \end{scope}
  % Stage 1 to Stage 2 (Optimal Path extracted from scope to render on top)
  \draw[optimal_edge] (1_01) -- node[pos=0.25, above, text=blue] {\scriptsize \textbf{1}} (2_02);

  % Stage 2 to Stage 3 (Identical grid dynamics)
  \begin{scope}[every path/.style={normal_edge}]
      % From x_0,0
      \draw (2_00) -- (3_01); \draw (2_00) -- (3_10);
      % From x_0,1
      \draw (2_01) -- (3_00); \draw (2_01) -- (3_02); 
      \draw[cost_edge] (2_01) -- node[pos=0.75, above right=-2pt, inner sep=1pt] {\scriptsize 5} (3_11); % Into mud
      % From x_0,2
      \draw (2_02) -- (3_01); 
      % From x_1,0
      \draw (2_10) -- (3_00); 
      \draw[cost_edge] (2_10) -- node[pos=0.75, below left=-2pt, inner sep=1pt] {\scriptsize 5} (3_11); % Into mud
      % From x_1,1 (Mud)
      \draw (2_11) -- (3_01); \draw (2_11) -- (3_10); \draw (2_11) -- (3_12);
      % From x_1,2
      \draw (2_12) -- (3_02);
      \draw[cost_edge] (2_12) -- node[pos=0.75, below right=-2pt, inner sep=1pt] {\scriptsize 5} (3_11); % Into mud
  \end{scope}
  % Stage 2 to Stage 3 (Optimal Path extracted from scope to render on top)
  \draw[optimal_edge] (2_02) -- node[pos=0.25, above right=-2pt, text=blue] {\scriptsize \textbf{1}} (3_12);

  % Stage 3 to Terminal Sink (t)
  \begin{scope}[every path/.style={thick}]
      \draw (3_00) -- node[pos=0.6, above, sloped] {\scriptsize $\infty$} (t);
      \draw (3_01) -- node[pos=0.6, above, sloped] {\scriptsize $\infty$} (t);
      \draw (3_02) -- node[pos=0.6, above, sloped] {\scriptsize $\infty$} (t);
      \draw (3_10) -- node[pos=0.6, below, sloped] {\scriptsize $\infty$} (t);
      \draw (3_11) -- node[pos=0.6, below, sloped] {\scriptsize $\infty$} (t);
  \end{scope}
  % Stage 3 to Terminal Sink (Optimal Path extracted)
  \draw[optimal_edge] (3_12) -- node[pos=0.6, below, sloped, text=blue] {\scriptsize \textbf{0}} (t);

\end{tikzpicture}
\end{document}
```

We can see that the optimal cost-to-go values are correctly computed at each stage, and the optimal path is consistent with the one we found using Dijkstra's algorithm. In fact this is exactly what Dijkstra's algorithm is doing under the hood, but in a more efficient way by only exploring the necessary states and transitions.

```execute-python
# 1. Grid World & DAG Setup
ROWS, COLS, T = 2, 3, 3

START = (0, 0, 0)
TARGET_GRID_STATE = (1, 2)
MUD = (1, 1)

# Actions: Up, Down, Left, Right
ACTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]

# J will store our optimal cost-to-go values: J[(k, r, c)] = optimal_cost
J = {}
# parent will store the best NEXT state to take (to reconstruct the path)
next_state = {}

# 2. Stage T: Initialize Terminal Costs (q_f)
for r in range(ROWS):
    for c in range(COLS):
        # 0 if it's the goal, infinity otherwise
        J[(T, r, c)] = 0 if (r, c) == TARGET_GRID_STATE else float('inf')

# 3. Dynamic Programming: Backward Induction (Stages T-1 down to 0)
for k in range(T - 1, -1, -1):
    for r in range(ROWS):
        for c in range(COLS):
            current_node = (k, r, c)
            best_cost = float('inf')
            best_next = None
            
            # Check all possible actions u_k
            for dr, dc in ACTIONS:
                nr, nc = r + dr, c + dc
                
                # If the action keeps us inside the grid bounds
                if 0 <= nr < ROWS and 0 <= nc < COLS:
                    # Immediate transition cost q_k(x_k, u_k)
                    transition_cost = 5 if (nr, nc) == MUD else 1
                    
                    # Bellman Equation: cost = q_k + J_{k+1}(x_{k+1})
                    total_cost = transition_cost + J[(k + 1, nr, nc)]
                    
                    # Track the minimum cost and the action that caused it
                    if total_cost < best_cost:
                        best_cost = total_cost
                        best_next = (k + 1, nr, nc)
            
            # Store the optimal values for this state
            J[current_node] = best_cost
            next_state[current_node] = best_next

# 4. Extract the Optimal Path (Forward pass)
path = []
curr = START

# Follow the optimal next states until we reach stage T
while curr is not None:
    path.append(curr)
    curr = next_state.get(curr)

# Add the final sink node to match the previous output format
path.append('t')

print(f"Optimal Total Cost J_0(Start): {J[START]}")
print(f"Optimal Path: {path}")
```

</details>

<details><summary>Curse of Dimensionality</summary>

In the Dynamic Programming algorithm, the total complexity is $\mathcal{O}( T |\mathcal{X}| |\mathcal{U}| )$ since we are computing the optimal cost-to-go for each state at each time step, and for each state we are iterating over all possible controls. This complexity is linear in the time horizon $T$, but it is exponential in the dimension of the state space $\mathcal{X}$ and control space $\mathcal{U}$, since typically $|\mathcal{X}|$ and $|\mathcal{U}|$ grow exponentially with the number of state and control variables.

This exponential growth in complexity is known as the **curse of dimensionality**, and it makes it infeasible to apply Dynamic Programming to problems with large state and control spaces. This is one of the main motivations for developing more scalable algorithms for Reinforcement Learning.

</details>

#### Q-Factor

In the Dynamic Programming algorithm, we can also define the optimal Q-factor for each state–control pair at time step $k$ as follows:
$$
\begin{equation} \label{eq:q_factor_definition}
Q^*_k(x, u) = q_k(x, u) + J^*_{k+1}(f_k(x, u)).
\end{equation}
$$
This is simply the expression inside the minimization in $\eqref{eq:dp_recursion}$:
$$
J^*_k(x) = \min_{u_k \in \mathcal{U}} Q^*_k(x, u_k).
$$
The optimal Q-factor represents the total cost of applying control $u$ in state $x$ at time step $k$, and then following the optimal policy for the remaining time steps. Dynamic Programming written in terms of the Q-factor is as follows:

<blockquote class="algorithm">

**Optimal Control Dynamic Programming with Q-Factors**

1. Initialize the terminal cost for all states $x \in \mathcal{X}$ and all controls $u \in \mathcal{U}$ (the terminal Q-factor is independent of $u$, since any control taken at the terminal step incurs the same cost $q_f(x)$):
    $$
    Q^*_T(x, u) = q_f(x)
    $$
2. Iterate backwards for $k = T-1, \ldots, 0$, setting:
    $$
    \begin{equation} \label{eq:q_factor_dp_recursion}
    Q^*_k(x, u) = q_k(x, u) + \min_{u' \in \mathcal{U}} Q^*_{k+1}(f_k(x, u), u')
    \end{equation}
    $$
    for all $x \in \mathcal{X}$ and $u \in \mathcal{U}$.

</blockquote>


<details><summary>Example of Q-Factor Dynamic Programming</summary>

```execute-python
# 1. Grid World Setup
ROWS, COLS, T = 2, 3, 3

START = (0, 0, 0)
TARGET_GRID_STATE = (1, 2)
MUD = (1, 1)

# Actions: Up, Down, Left, Right
ACTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]

# Q will store our optimal cost-to-go for state-control pairs
# Structure: Q[(k, r, c, action)] = total_cost
Q = {}

# 2. Dynamic Programming: Backward Induction with Q-Factors
for k in range(T - 1, -1, -1):
    for r in range(ROWS):
        for c in range(COLS):
            
            # Evaluate every possible action from this state
            for dr, dc in ACTIONS:
                nr, nc = r + dr, c + dc
                
                # Default cost is infinity if the action is invalid (hits a wall)
                Q[(k, r, c, (dr, dc))] = float('inf')
                
                if 0 <= nr < ROWS and 0 <= nc < COLS:
                    # Immediate cost q_k(x, u)
                    transition_cost = 5 if (nr, nc) == MUD else 1
                    
                    # Next state's optimal value J_{k+1}(x') 
                    if k + 1 == T:
                        # Terminal cost q_f
                        next_J = 0 if (nr, nc) == TARGET_GRID_STATE else float('inf')
                    else:
                        # J_{k+1}(x') is simply the minimum of its available Q-factors
                        next_J = min(Q[(k + 1, nr, nc, a)] for a in ACTIONS)
                        
                    # Q-Factor Recursion
                    Q[(k, r, c, (dr, dc))] = transition_cost + next_J

# 3. Extract the Optimal Path (Forward pass via ArgMin)
path = [START]
curr_r, curr_c = START[1], START[2]

for k in range(T):
    # Argmin: Find the action that yields the lowest Q-factor
    best_action = min(ACTIONS, key=lambda a: Q[(k, curr_r, curr_c, a)])
    
    # Apply the action to transition to the next state
    curr_r += best_action[0]
    curr_c += best_action[1]
    path.append((k + 1, curr_r, curr_c))

path.append('t')

print(f"Optimal Path: {path}")
```

</details>

### Stochastic Dynamic Programming

Instead of having deterministic dynamics $\eqref{eq:optimal_control_dynamics}$, we can model a dynamical system with stochastic dynamics as follows:
$$
\begin{equation} \label{eq:stochastic_dynamics}
x_{k+1} = f_k\left(x_k, u_k \right) + \epsilon_k
\end{equation}
$$
We assume $\epsilon_k$ is a random variable drawn from some known distribution. In this case, a sequence of control signals $(u_0, \ldots, u_{T-1})$ will lead to different trajectories $(x_0; x_1, \dots, x_T)$ depending on realizations of $\epsilon_k$. Therefore, we modify $\eqref{eq:optimal_control_problem}$ to minimize the expected value of the cost over all possible state-trajectories
$$
\begin{equation} \label{eq:optimal_control_problem_stochastic_initial}
J(x_0; u_0, \ldots, u_{T-1}) = \mathbb{E}_{\epsilon} \left[ q_f(x_T) + \sum_{k=0}^{T-1} q_k(x_k, u_k) \right]
\end{equation}
$$
However, as the robot starts executing its trajectory, the realizations of noise might cause it to deviate far from the expected trajectory. Therefore, instead of computing a single optimal control sequence at the beginning, we can use **feedback control**. Formally, instead of seeking an optimal control sequence $u^*$, we find a function that maps state to control:
$$
\begin{equation}
u_k(x): \mathcal{X} \to \mathcal{U}
\end{equation}
$$
Now, the robot can observe its current state at each time step and apply the appropriate control according to this function. We will denote the space of all feedback controls $u_k(\cdot)$ that depend on the state as:
$$
u_k(\cdot) \in \mathcal{U}(\mathcal{X})
$$ 

We define a **control policy** as a sequence of feedback control functions:
$$
\begin{equation} \label{eq:control_policy}
\pi = \left( u_0(\cdot), u_1(\cdot), \ldots, u_{T-1}(\cdot) \right).
\end{equation}
$$
And now, we define the stochastic optimal control problem.

<blockquote class="definition">

The **stochastic optimal control problem** is to find the sequence of feedback controls $(u_0(\cdot), u_1(\cdot), \ldots, u_{T-1}(\cdot))$ that minimizes:
$$
\begin{equation} \label{eq:optimal_control_problem_stochastic}
\begin{aligned}
J(x_0; u_0(\cdot), \ldots, u_{T-1}(\cdot)) &= \mathbb{E}_{\epsilon} \left[ q_f(x_T) + \sum_{k=0}^{T-1} q_k\left(x_k, u_k(x_k)\right) \right] \\
J^*(x_0) &= \min_{u_k(\cdot) \in \mathcal{U}(\mathcal{X})} J(x_0; u_0(\cdot), \ldots, u_{T-1}(\cdot))
\end{aligned}
\end{equation}
$$
where $J^*(x_0)$ is the optimal cost starting from state $x_0$. 

</blockquote>

Dijkstra's algorithm no longer works as the edges in the graph are no longer deterministic. However, we can still apply the principle of dynamic programming to solve this problem. 

<blockquote class="algorithm">

**Finite-Horizon Dynamic Programming for Stochastic Systems**

1. Initialize the terminal cost for all states $x \in \mathcal{X}$:
    $$
    J^*_T(x) = q_f(x)
    $$
2. Iterate backwards for $k = T-1, \ldots, 0$, setting:
    $$
    \begin{equation} \label{eq:dp_recursion_stochastic}
    J_k^*(x)=\min_{u_k(\cdot) \in \mathcal{U}(\mathcal{X})}\left\{q_k\left(x, u_k(x)\right)+\underset{\epsilon_k}{\mathbb{E}}\left[J_{k+1}^*\left(f_k\left(x, u_k(x)\right)+\epsilon_k\right)\right]\right\}
    \end{equation}
    $$
    for all $x \in \mathcal{X}$.

</blockquote>

Alternatively, we can write $\eqref{eq:dp_recursion_stochastic}$ in the form of a transition matrix:
$$
\begin{equation} \label{eq:dp_recursion_stochastic_transition_matrix}
J_k^*(x)=\min_{u_k(\cdot) \in \mathcal{U}(\mathcal{X})}\left\{q_k\left(x, u_k(x)\right)+{\mathbb{E}_{x' \sim \mathrm{P}\left(\cdot \mid x_k, u_k(x_k)\right)}}\left[J_{k+1}^*\left(x'  \right)\right]\right\}
\end{equation}
$$
Therefore, each subproblem performs an additional expectation over the next state $x'$ compared to the deterministic case, which brings the total complexity to $\mathcal{O}( T |\mathcal{X}|^2 |\mathcal{U}| )$ since we need to compute the expected cost for each state-control pair by summing over all possible next states. 

### Infinite-Horizon Problems

In real-world problems, the time horizon $T$ is often not fixed and can be infinite. In this case, we assume at any time-step, the length of the trajectory remaining for the robot to traverse is infinite. We will assume that the system is time-invariant, meaning that the cost function and dynamics do not change over time:
$$
\begin{aligned}
q(x, u) &= q_k(x, u) \quad \forall k \\
f(x, u) &= f_k(x, u) \quad \forall k
\end{aligned}
$$
If the system is stochastic, we also require the noise distribution to be time-invariant, meaning that the distribution of $\epsilon_k$ does not change with $k$. In this case, we can define the infinite-horizon optimal control problem as follows:

<blockquote class="definition">

The **infinite-horizon optimal control problem** is to find a control policy $\pi = \left( u_0(\cdot), u_1(\cdot), \ldots \right)$ that minimizes the expected discounted cost:
$$
\begin{equation} \label{eq:optimal_control_problem_infinite_horizon}
\begin{aligned}
J(x_0; \pi) &= \lim_{T \to \infty} \mathbb{E}_{\epsilon} \left[\sum_{k=0}^{T-1} \gamma^k q(x_k, u_k(x_k)) \right] \\
J^*(x_0) &= \min_{\pi} J(x_0; \pi)
\end{aligned}
\end{equation}
$$
where $\gamma \in (0, 1)$ is a discount factor that ensures the infinite sum converges, and $J^*(x_0)$ is the optimal cost starting from state $x_0$.

</blockquote>

The discount factor $\gamma$ puts more emphasis on costs incurred earlier in the trajectory than later ones, and thereby encourages the length of the trajectory to be small. Note that we dropped the dependency on $k$ for $J(\cdot)$, since the system is time-invariant and the cost function does not change with time.

#### Stochastic Shortest Path Problem

A special case of the infinite-horizon optimal control problem is the **stochastic shortest path problem**, where we set $\gamma = 1$ and have a set of terminal states $\mathcal{X}_\mathrm{term} \subseteq \mathcal{X}$ such that once the robot reaches any state in $\mathcal{X}_\mathrm{term}$, it incurs zero cost for all future time steps. Formally, we have
$$
\begin{equation} \label{eq:stochastic_shortest_path_terminal_cost}
q(x, u) = 0 \quad \forall x \in \mathcal{X}_\mathrm{term}, \forall u \in \mathcal{U}.
\end{equation}
$$
One such example could be a grid-world example. Suppose we have a starting state and a known terminal state, we would like to solve for the optimal trajectory in an unknown number of steps. 

#### Value Iteration

To solve for the optimal cost function $\eqref{eq:optimal_control_problem_infinite_horizon}$, we can use Value Iteration which is a dynamic programming algorithm that iteratively computes the optimal value function until it converges to the optimal value function $J^*(x)$.

<blockquote class="algorithm" id="def:value-iteration">

**Value Iteration**

The algorithm proceeds iteratively to maintain a sequence of approximations $J^{(0)}(x), J^{(1)}(x), J^{(2)}(x), \dots$ to the optimal value function $J^*(x)$.

1. Initialize the value function estimate for all states $x \in \mathcal{X}$:
    $$
    J^{(0)}(x) = 0
    $$

2. At each iteration $i = 0, 1, 2, \dots$, update the value function for all $x \in \mathcal{X}$ using the Bellman equation:
    $$
    \begin{equation} \label{eq:value_iteration_update}
    J^{(i+1)}(x) = \min_{u \in \mathcal{U}} \left\{ q(x, u) + \gamma \underset{\epsilon}{\mathbb{E}} \left[ J^{(i)}(f(x, u) + \epsilon) \right] \right\}
    \end{equation}
    $$
    Continue this process until the value function converges, meaning the maximum change across all states is below a small tolerance threshold $\delta$:
    $$
    \max_{x \in \mathcal{X}} \left| J^{(i+1)}(x) - J^{(i)}(x) \right| < \delta
    $$
    
3. Once converged to the optimal value function $J^{(N)}(x) \approx J^*(x)$, extract the optimal stationary policy $\pi^* = (u^*(\cdot), u^*(\cdot), \ldots)$ by choosing the control that minimizes the right-hand side:
    $$
    \begin{equation} \label{eq:optimal_policy_extraction}
    u^*(x) = \arg\min_{u \in \mathcal{U}} \left\{ q(x, u) + \gamma \underset{\epsilon}{\mathbb{E}} \left[ J^{(N)}(f(x, u) + \epsilon) \right] \right\}
    \end{equation}
    $$
    for all $x \in \mathcal{X}$.

</blockquote>

<details><summary>Q-Value Iteration</summary>

Similar to the finite-horizon case, we can also write the infinite-horizon value iteration algorithm in terms of Q-factors $\eqref{eq:q_factor_definition}$, which is known as Q-value iteration.


<blockquote class="algorithm" id="def:q-value-iteration">

**Q-Value Iteration**

The algorithm proceeds iteratively to maintain a sequence of approximations $Q^{(0)}(x, u), Q^{(1)}(x, u), Q^{(2)}(x, u), \dots$ to the optimal Q-factor $Q^*(x, u)$.

1. Initialize the Q-factor estimate for all state-control pairs $x \in \mathcal{X}$ and $u \in \mathcal{U}$:
    $$
    Q^{(0)}(x, u) = 0
    $$

2. At each iteration $i = 0, 1, 2, \dots$, update the Q-factors for all $x \in \mathcal{X}$ and $u \in \mathcal{U}$ using the Bellman equation:
    $$
    Q^{(i+1)}(x, u) = q(x, u) + \gamma \underset{\epsilon}{\mathbb{E}} \left[ \min_{u' \in \mathcal{U}} Q^{(i)}(f(x, u) + \epsilon, u') \right]
    $$
    Continue this process until the Q-factors converge, meaning the maximum change across all state-control pairs is below a small tolerance threshold $\delta$:
    $$
    \max_{x \in \mathcal{X}, u \in \mathcal{U}} \left| Q^{(i+1)}(x, u) - Q^{(i)}(x, u) \right| < \delta
    $$

3. Once converged to the optimal Q-factor $Q^{(N)}(x, u) \approx Q^*(x, u)$, extract the optimal stationary policy $\pi^* = (u^*(\cdot), u^*(\cdot), \ldots)$ by choosing the control that minimizes the Q-factor for each state:
    $$
    u^*(x) = \arg\min_{u \in \mathcal{U}} Q^{(N)}(x, u)
    $$
    for all $x \in \mathcal{X}$.

</blockquote>

</details>


<details><summary>Example of Value Iteration</summary>

Suppose we are in a 3x4 grid world environment with the following states:
$$
\begin{matrix}
x^{(0,0)} & x^{(0,1)} & x^{(0,2)} & x^{(0,3)} \\
x^{(1,0)} & x^{(1,1)} & \textcolor{orange}{x^{(1,2)}} & x^{(1,3)} \\
x^{(2,0)} & \textcolor{orange}{x^{(2,1)}} & x^{(2,2)} & \textcolor{green}{x^{(2,3)}} \\
\end{matrix}
$$
and the goal state $x^{(2,3)}$ is at the bottom-right, and it is a terminal state that incurs zero cost for all future time steps. 
$$
q(x^{(2,3)}, u) = 0 \quad \forall u \in \mathcal{U}
$$
Suppose we have mud states $x^{(1,2)}$ and $x^{(2,1)}$. Stepping into the mud costs $5$, and all other states have a cost of $1$ for any control. We also assume that we have deterministic dynamics, and we use a discount factor of $\gamma = 1$. 

Following [Value Iteration](#bqref-def:value-iteration), we set $J^{(0)}(x) = 0$ for all states:

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, auto, node distance=2.5cm, thick]
  \tikzstyle{n}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=white]
  \tikzstyle{m}=[circle, draw, dashed, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=orange!20]
  \tikzstyle{g}=[circle, draw=green!60!black, very thick, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=green!10]

  % Row 0
  \node[n] (00) at (0, 0) {0.0}; \node[n] (01) at (2.5, 0) {0.0}; \node[n] (02) at (5, 0) {0.0}; \node[n] (03) at (7.5, 0) {0.0};
  % Row 1
  \node[n] (10) at (0, -2.5) {0.0}; \node[n] (11) at (2.5, -2.5) {0.0}; \node[m] (12) at (5, -2.5) {0.0}; \node[n] (13) at (7.5, -2.5) {0.0};
  % Row 2
  \node[n] (20) at (0, -5) {0.0}; \node[m] (21) at (2.5, -5) {0.0}; \node[n] (22) at (5, -5) {0.0}; \node[g] (23) at (7.5, -5) {0.0};

  % Edges
  \foreach \y in {0, 1, 2} { \draw[<->, gray!40] (\y0) -- (\y1); \draw[<->, gray!40] (\y1) -- (\y2); \draw[<->, gray!40] (\y2) -- (\y3); }
  \foreach \x in {0, 1, 2, 3} { \draw[<->, gray!40] (0\x) -- (1\x); \draw[<->, gray!40] (1\x) -- (2\x); }
\end{tikzpicture}
\end{document}
```

Since $J^{(0)}$ is $0$ everywhere, the second term in $\eqref{eq:value_iteration_update}$ drops out. For the first iteration, the value of a state is simply the cheapest immediate step you can take:
$$
J^{(1)}(x) = \min_{u \in \mathcal{U}} q(x, u)
$$

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, auto, node distance=2.5cm, thick]
  \tikzstyle{n}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!10]
  \tikzstyle{m}=[circle, draw, dashed, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=orange!20]
  \tikzstyle{g}=[circle, draw=green!60!black, very thick, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=green!10]

  % Row 0
  \node[n] (00) at (0, 0) {1.0}; \node[n] (01) at (2.5, 0) {1.0}; \node[n] (02) at (5, 0) {1.0}; \node[n] (03) at (7.5, 0) {1.0};
  % Row 1
  \node[n] (10) at (0, -2.5) {1.0}; \node[n] (11) at (2.5, -2.5) {1.0}; \node[m] (12) at (5, -2.5) {1.0}; \node[n] (13) at (7.5, -2.5) {1.0};
  % Row 2
  \node[n] (20) at (0, -5) {1.0}; \node[m] (21) at (2.5, -5) {1.0}; \node[n] (22) at (5, -5) {1.0}; \node[g] (23) at (7.5, -5) {0.0};

  % Edges
  \foreach \y in {0, 1, 2} { \draw[<->, gray!40] (\y0) -- (\y1); \draw[<->, gray!40] (\y1) -- (\y2); \draw[<->, gray!40] (\y2) -- (\y3); }
  \foreach \x in {0, 1, 2, 3} { \draw[<->, gray!40] (0\x) -- (1\x); \draw[<->, gray!40] (1\x) -- (2\x); }
\end{tikzpicture}
\end{document}
```

We now follow $\eqref{eq:value_iteration_update}$ to compute $J^{(2)}$. For example, for state $x^{(2,2)}$, we have
$$
J^{(2)}(x^{(2,2)}) = \min \left\{
\begin{aligned}
q(x^{(2,2)}, \text{up}) + J^{(1)}(x^{(1,2)}) = 5 + 1 = 6 \\
q(x^{(2,2)}, \text{left}) + J^{(1)}(x^{(2,1)}) = 5 + 1 = 6 \\
q(x^{(2,2)}, \text{right}) + J^{(1)}(x^{(2,3)}) = 1 + 0 = 1 \\
\end{aligned}
\right\} = 1
$$
Similarly, for state $x^{(1,1)}$, we have
$$
J^{(2)}(x^{(1,1)}) = \min \left\{
\begin{aligned}
q(x^{(1,1)}, \text{up}) + J^{(1)}(x^{(0,1)}) = 1 + 1 = 2 \\
q(x^{(1,1)}, \text{down}) + J^{(1)}(x^{(2,1)}) = 5 + 1 = 6 \\
q(x^{(1,1)}, \text{left}) + J^{(1)}(x^{(1,0)}) = 1 + 1 = 2 \\
q(x^{(1,1)}, \text{right}) + J^{(1)}(x^{(1,2)}) = 5 + 1 = 6 \\
\end{aligned}
\right\} = 2
$$

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, auto, node distance=2.5cm, thick]
  \tikzstyle{c1}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!10]
  \tikzstyle{c2}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!20]
  \tikzstyle{m}=[circle, draw, dashed, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=orange!20]
  \tikzstyle{g}=[circle, draw=green!60!black, very thick, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=green!10]

  % Row 0
  \node[c2] (00) at (0, 0) {2.0}; \node[c2] (01) at (2.5, 0) {2.0}; \node[c2] (02) at (5, 0) {2.0}; \node[c2] (03) at (7.5, 0) {2.0};
  % Row 1
  \node[c2] (10) at (0, -2.5) {2.0}; \node[c2] (11) at (2.5, -2.5) {2.0}; \node[m] (12) at (5, -2.5) {2.0}; \node[c1] (13) at (7.5, -2.5) {1.0};
  % Row 2
  \node[c2] (20) at (0, -5) {2.0}; \node[m] (21) at (2.5, -5) {2.0}; \node[c1] (22) at (5, -5) {1.0}; \node[g] (23) at (7.5, -5) {0.0};

  % Edges
  \foreach \y in {0, 1, 2} { \draw[<->, gray!40] (\y0) -- (\y1); \draw[<->, gray!40] (\y1) -- (\y2); \draw[<->, gray!40] (\y2) -- (\y3); }
  \foreach \x in {0, 1, 2, 3} { \draw[<->, gray!40] (0\x) -- (1\x); \draw[<->, gray!40] (1\x) -- (2\x); }
\end{tikzpicture}
\end{document}
```

We can continue this process until convergence, and we will find that the optimal value function is as follows:

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, auto, node distance=2.5cm, thick]
  % Define node styles with progressive shading for higher values
  \tikzstyle{c1}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!10]
  \tikzstyle{c2}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!20]
  \tikzstyle{c3}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!30]
  \tikzstyle{c4}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!40]
  \tikzstyle{c5}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!50]
  \tikzstyle{c6}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!60]
  \tikzstyle{c7}=[circle, draw, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=blue!70]
  
  \tikzstyle{m}=[circle, draw, dashed, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=orange!20]
  \tikzstyle{g}=[circle, draw=green!60!black, very thick, minimum size=1.2cm, inner sep=1pt, font=\small\bfseries, fill=green!10]

  % Row 0
  \node[c5] (00) at (0, 0) {5.0}; 
  \node[c4] (01) at (2.5, 0) {4.0}; 
  \node[c3] (02) at (5, 0) {3.0}; 
  \node[c2] (03) at (7.5, 0) {2.0};
  
  % Row 1
  \node[c6] (10) at (0, -2.5) {6.0}; 
  \node[c5] (11) at (2.5, -2.5) {5.0}; 
  \node[m]  (12) at (5, -2.5) {2.0}; 
  \node[c1] (13) at (7.5, -2.5) {1.0};
  
  % Row 2
  \node[c7] (20) at (0, -5) {7.0}; 
  \node[m]  (21) at (2.5, -5) {2.0}; 
  \node[c1] (22) at (5, -5) {1.0}; 
  \node[g]  (23) at (7.5, -5) {0.0};

  % Edges
  \foreach \y in {0, 1, 2} { 
      \draw[<->, gray!40] (\y0) -- (\y1); 
      \draw[<->, gray!40] (\y1) -- (\y2); 
      \draw[<->, gray!40] (\y2) -- (\y3); 
  }
  \foreach \x in {0, 1, 2, 3} { 
      \draw[<->, gray!40] (0\x) -- (1\x); 
      \draw[<->, gray!40] (1\x) -- (2\x); 
  }
\end{tikzpicture}
\end{document}
```

The equivalent code to compute the optimal value function using Value Iteration is as follows:

```execute-python
R, C = 3, 4
goal = (2, 3)
mud = {(1, 2), (2, 1)}

# Initialize grid with 0s
J = [[0.0] * C for _ in range(R)]

tolerance = 1e-5
delta = float('inf')
iteration = 0

while delta > tolerance:
    J_new = [[0.0] * C for _ in range(R)]
    delta = 0.0 # Reset max change for this iteration
    
    for r in range(R):
        for c in range(C):
            if (r, c) == goal: 
                continue # Goal stays 0
            
            # Find min( cost + J[next_state] ) across all 4 moves
            min_val = float('inf')
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                
                # Stay in place if move hits a wall
                if not (0 <= nr < R and 0 <= nc < C): 
                    nr, nc = r, c 
                
                # Cost is 5 if stepping INTO mud, else 1
                cost = 5.0 if (nr, nc) in mud else 1.0
                min_val = min(min_val, cost + J[nr][nc])
                
            J_new[r][c] = min_val
            
            # Track the maximum change across the entire grid
            state_delta = abs(J_new[r][c] - J[r][c])
            delta = max(delta, state_delta)
            
    J = J_new # Update grid
    iteration += 1
    
    print(f"\n--- Iteration {iteration} (Max Delta: {delta:.1f}) ---")
    for row in J: 
        print([round(val, 1) for val in row])

print(f"\nConverged to optimal value function in {iteration} iterations!")
```

Now, we follow $\eqref{eq:optimal_policy_extraction}$ to extract the optimal control for each state. There may be multiple optimal controls for a state.

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, auto, node distance=2.5cm, thick]
  % Define node styles
  \tikzstyle{n}=[circle, draw, minimum size=1.4cm, inner sep=1pt, font=\Large\bfseries, fill=white]
  \tikzstyle{m}=[circle, draw, dashed, minimum size=1.4cm, inner sep=1pt, font=\Large\bfseries, fill=orange!20]
  \tikzstyle{g}=[circle, draw=green!60!black, very thick, minimum size=1.4cm, inner sep=1pt, font=\Large\bfseries, fill=green!10]

  % Row 0 (Path routes along the top to avoid mud)
  \node[n] (00) at (0, 0) {$\rightarrow$}; 
  \node[n] (01) at (2.5, 0) {$\rightarrow$}; 
  \node[n] (02) at (5, 0) {$\rightarrow$}; 
  \node[n] (03) at (7.5, 0) {$\downarrow$};
  
  % Row 1
  % State (1,0) has two optimal controls: Up and Right
  \node[n] (10) at (0, -2.5) {$\uparrow \ \rightarrow$}; 
  \node[n] (11) at (2.5, -2.5) {$\uparrow$}; 
  % State (1,2) has two optimal controls: Right and Down
  \node[m] (12) at (5, -2.5) {$\rightarrow \ \downarrow$}; 
  \node[n] (13) at (7.5, -2.5) {$\downarrow$};
  
  % Row 2
  % State (2,0) has two optimal controls: Up and Right
  \node[n] (20) at (0, -5) {$\uparrow \ \rightarrow$}; 
  \node[m] (21) at (2.5, -5) {$\rightarrow$}; 
  \node[n] (22) at (5, -5) {$\rightarrow$}; 
  \node[g] (23) at (7.5, -5) {$\star$}; % Goal state is terminal

  % Edges connecting the grid
  \foreach \y in {0, 1, 2} { 
      \draw[<->, gray!40] (\y0) -- (\y1); 
      \draw[<->, gray!40] (\y1) -- (\y2); 
      \draw[<->, gray!40] (\y2) -- (\y3); 
  }
  \foreach \x in {0, 1, 2, 3} { 
      \draw[<->, gray!40] (0\x) -- (1\x); 
      \draw[<->, gray!40] (1\x) -- (2\x); 
  }
\end{tikzpicture}
\end{document}
```

</details>

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
\frac{d}{dx}\left( \log f(x) \right) = \frac{1}{f(x)} \frac{d}{dx} f(x) \implies \nabla_\theta \log p_\theta(\tau) = \frac{\nabla_\theta p_\theta(\tau)}{p_\theta(\tau)},
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

Monte Carlo returns are unbiased estimates of the expected return under the policy. However, because they depend on all future rewards, they can have very high variance, especially in long-horizon or stochastic environments. This is the primary limitation of vanilla policy gradient methods.

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
We rewrite $p_\theta(h_t, a_t)$ using the chain rule $\eqref{eq:chain_rule}$:
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
\mathbb{E}_{h_t \sim p_\theta(h_t)}\left[B_t \mathbb{E}_{a_t \sim \pi_\theta(a_t \mid s_t)}\left[\nabla_\theta \log \pi_\theta(a_t \mid s_t)\right]\right].
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
\begin{equation} \label{eq:reward_to_go_unbiased}
\mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\nabla_\theta \log \pi_\theta(a_t \mid s_t) B_t\right] = 0,
\end{equation}
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

By stripping out the past rewards (which act as irrelevant noise for the current action), we significantly **lower the variance** of the gradient estimate, making your training process much more stable and sample-efficient.

We may ask whether 
$$
b\left(s_t\right)=\mathbb{E}_{a \sim \pi_\theta\left(a \mid s_t\right)}\left[f\left(s_t, a\right)\right]
$$ 
is still a valid baseline. We can write it in the summation form:
$$
b(s_t) = \sum_{a} \pi_\theta(a \mid s_t) f(s_t, a). 
$$
Since we are marginalizing out the action, this baseline does not depend on the sampled action $a_t$, and is therefore a valid baseline that can be subtracted from the return without changing the expected value of the policy gradient.

### Value Functions and Advantage Functions

The reward-to-go $G_t$ defined in $\eqref{eq:reward_to_go}$ is a sample-based quantity: for a particular trajectory, it gives the actual cumulative reward obtained from time $t$ onward. In RL, it is often useful to consider the _expected_ future return conditioned on the current state or action. This leads to the definitions of the state-value function, action-value function, and advantage function.

The **state-value function** under policy $\pi$ measures the expected future return starting from state $s$ and then following policy $\pi$ thereafter:
$$
\begin{equation} \label{eq:state_value_reward_to_go}
V^\pi(s_t) = \mathbb{E}_{\pi}\left[G_t \mid s_t\right].
\end{equation}
$$

The **action-value function** under policy $\pi$ measures the expected future return starting from state $s$, taking action $a$, and then following policy $\pi$ thereafter:
$$
\begin{equation} \label{eq:action_value_reward_to_go}
Q^\pi(s_t,a_t) = \mathbb{E}_{\pi}\left[G_t \mid s_t,\; a_t\right].
\end{equation}
$$
The difference between $V^\pi(s_t)$ and $Q^\pi(s_t,a_t)$ is that $V^\pi(s_t)$ averages over the action chosen by the policy, while $Q^\pi(s_t,a_t)$ conditions on a particular action being taken. In practice, we do not have access to this expectation. Instead, from a single trajectory we can compute the empirical return:
$$
\hat{Q}(s_t,a_t) = G_t,
$$
which means it is an unbiased estimator with high variance as it depends on the entire future trajectory.

The state-value function is the expectation of the action-value function over the policy:
$$
\begin{equation} \label{eq:v_from_q}
V^\pi(s_t) = \mathbb{E}_{a_t \sim \pi_\theta(\cdot \mid s_t)}\left[Q^\pi(s_t,a_t)\right].
\end{equation}
$$
For discrete action spaces, this can be written explicitly as
$$
\begin{equation} \label{eq:v_from_q_discrete}
V^\pi(s_t) = \sum_{a_t} \pi_\theta(a_t \mid s_t) Q^\pi(s_t,a_t).
\end{equation}
$$
This equation shows that $V^\pi(s)$ is the average quality of the actions available in state $s$, weighted by how likely the policy is to choose each action.

We can also write $Q^\pi(s_t,a_t)$ in terms of $V^\pi(s)$:
$$
\begin{equation} \label{eq:q_from_v}
Q^\pi(s_t,a_t) = r(s_t, a_t) + \gamma \mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)}\left[V^\pi(s_{t+1})\right].
\end{equation}
$$


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

#### Bias-Variance Tradeoff in Policy Gradients

We use the policy gradient of the form:
$$
\begin{equation} \label{eq:policy_gradient_with_psi}
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\tau)}\left[\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \Psi_t\right],
\end{equation}
$$
where $\Psi_t$ is some estimator of the return. We have the following choices for $\Psi_t$:

- $\Psi_t=R(\tau)$ : This uses the full-trajectory return. It is an unbiased policy-gradient estimator, but it has the highest variance, since it includes rewards that occurred before time $t$ and other irrelevant trajectory noise.
- $\Psi_t=G_t$ : This is the reward-to-go. It is also unbiased, and it typically has lower variance than $R(\tau)$ , because it removes rewards that happened before action $a_t$.
- $\Psi_t=G_t-b\left(h_t\right)$ : This is reward-to-go with a baseline. It remains unbiased as long as $b\left(h_t\right)$ does not depend on the sampled action $a_t$. A good baseline can reduce variance further, often substantially.
- $\Psi_t=Q^\pi\left(s_t, a_t\right)$ : This uses the state-action value. If $Q^\pi$ is exact, it gives an unbiased estimator and usually has lower variance than sampled returns such as $G_t$, because it averages over future randomness. In practice, $Q^\pi$ must be estimated, which can introduce bias.
- $\Psi_t=A^\pi\left(s_t, a_t\right)$ : This uses the advantage function. If exact, it is also unbiased and is often preferred because it centers the signal relative to the state value, which typically reduces variance compared with using $Q^\pi\left(s_t, a_t\right)$ directly. In practice, estimating $A^\pi$ can introduce bias.
- $\Psi_t=r_t+\gamma V^\pi\left(s_{t+1}\right)-V^\pi\left(s_t\right)$ : This is the TD error. If $V^\pi$ is exact, it is an unbiased one-step estimator of the advantage in expectation:
    $$
    \mathbb{E}\left[\delta_t \mid s_t, a_t\right]=A^\pi\left(s_t, a_t\right) .
    $$
    It is popular because it uses bootstrapping and often has lower variance than Monte Carlo returns, but if $V^\pi$ is approximate, it can introduce bias.

We can compute exact $V^\pi$ and $Q^\pi$ with Bellman equations in small tabular MDPs:
$$
\begin{equation} \label{eq:bellman_equations}
\begin{aligned}
V^\pi\left(s_t\right)&=\mathbb{E}_{a_t \sim \pi\left(\cdot \mid s_t\right)}\left[r\left(s_t, a_t\right)+\gamma \mathbb{E}_{s_{t+1} \sim p\left(\cdot \mid s_t, a_t\right)}\left[V^\pi\left(s_{t+1}\right)\right]\right] \\
V^\pi(s)&=\sum_a \pi(a \mid s)\left(r(s, a)+\gamma \sum_{s^{\prime}} p\left(s^{\prime} \mid s, a\right) V^\pi\left(s^{\prime}\right)\right) \\
V^\pi\left(s_t\right)&=\mathbb{E}_{a_t \sim \pi\left(\cdot \mid s_t\right)}\left[Q^\pi\left(s_t, a_t\right)\right] \\
V^\pi(s)&=\sum_a \pi(a \mid s) Q^\pi(s, a)
\end{aligned}
\end{equation}
$$
$$
\begin{equation} \label{eq:bellman_equations_q}
\begin{aligned}
Q^\pi\left(s_t, a_t\right)&=r\left(s_t, a_t\right)+\gamma \mathbb{E}_{s_{t+1} \sim p\left(\cdot \mid s_t, a_t\right)}\left[\mathbb{E}_{a_{t+1} \sim \pi\left(\cdot \mid s_{t+1}\right)}\left[Q^\pi\left(s_{t+1}, a_{t+1}\right)\right]\right] \\
Q^\pi(s, a)&=r(s, a)+\gamma \sum_{s^{\prime}} p\left(s^{\prime} \mid s, a\right) \sum_{a^{\prime}} \pi\left(a^{\prime} \mid s^{\prime}\right) Q^\pi\left(s^{\prime}, a^{\prime}\right) \\
Q^\pi\left(s_t, a_t\right)&=r\left(s_t, a_t\right)+\gamma \mathbb{E}_{s_{t+1} \sim p\left(\cdot \mid s_t, a_t\right)}\left[V^\pi\left(s_{t+1}\right)\right] \\
Q^\pi(s, a)&=r(s, a)+\gamma \sum_{s^{\prime}} p\left(s^{\prime} \mid s, a\right) V^\pi\left(s^{\prime}\right) .
\end{aligned}
\end{equation}
$$
where $\gamma \in [0,1]$ is the discount factor that controls how much we care about future rewards. 

<details><summary>Derivation of the Bellman equations</summary>

From $\eqref{eq:state_value_reward_to_go}$, we have
$$
\begin{aligned}
V^\pi(s_t) &= \mathbb{E}_{\pi}\left[G_t \mid s_t\right] \\
&= \mathbb{E}_{\pi}\left[r(s_t, a_t) + \gamma G_{t+1} \mid s_t\right].
\end{aligned}
$$
Using the law of total expectation:
$$
\begin{aligned}
\mathbb{E}[X] &= \mathbb{E}[\mathbb{E}[X \mid Y]] \\
\mathbb{E}[X \mid Z] &= \mathbb{E}[\mathbb{E}[X \mid Y, Z] \mid Z].
\end{aligned}
$$
We can apply the law of total expectation with extra conditioning on $a_t$:
$$
\begin{aligned}
V^\pi(s_t) &= \mathbb{E}_{\pi}\left[\mathbb{E}_{\pi}\left[r(s_t, a_t) + \gamma G_{t+1} \mid s_t, a_t\right] \mid s_t\right] \\
&=\mathbb{E}_{a_t \sim \pi(\cdot \mid s_t)}\left[\mathbb{E}_{\pi}\left[r(s_t, a_t) + \gamma G_{t+1} \mid s_t, a_t\right]\right] \\
&=\mathbb{E}_{a_t \sim \pi(\cdot \mid s_t)}\left[r(s_t, a_t) + \gamma\mathbb{E}_{\pi}\left[ G_{t+1} \mid s_t, a_t\right]\right] \\
\end{aligned}
$$
We can apply the law of total expectation with extra conditioning on $s_{t+1}$ on the inner expectation:
$$
\begin{aligned}
\mathbb{E}_{\pi}\left[ G_{t+1} \mid s_t, a_t\right] &= \mathbb{E}_{\pi} \left[\mathbb{E}_{\pi}\left[ G_{t+1} \mid s_{t+1}, s_t, a_t\right] \mid s_t, a_t\right] \\
&= \mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)} \left[\mathbb{E}_{\pi}\left[ G_{t+1} \mid s_{t+1}, s_t, a_t\right]\right] \\
&= \mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)} \left[\mathbb{E}_{\pi}\left[ G_{t+1} \mid s_{t+1}\right]\right] \\
&= \mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)} \left[V^\pi(s_{t+1})\right]
\end{aligned}
$$
Substituting back into the original equation to get $\eqref{eq:bellman_equations}$:
$$
\begin{aligned}
V^\pi(s_t) &=\mathbb{E}_{a_t \sim \pi(\cdot \mid s_t)}\left[r(s_t, a_t) + \gamma\mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)} \left[V^\pi(s_{t+1})\right]\right] 
\end{aligned}
$$

From $\eqref{eq:action_value_reward_to_go}$, we have
$$
\begin{aligned}
Q^\pi(s_t, a_t) &= \mathbb{E}_{\pi}\left[G_t \mid s_t, a_t\right] \\
&= \mathbb{E}_{\pi}\left[r(s_t, a_t) + \gamma G_{t+1} \mid s_t, a_t\right] \\
&= r(s_t, a_t) + \gamma \mathbb{E}_{\pi}\left[G_{t+1} \mid s_t, a_t\right].
\end{aligned}
$$
Applying the law of total expectation with extra conditioning on $s_{t+1}$ in the second term:
$$
\begin{aligned}
\mathbb{E}_{\pi}\left[G_{t+1} \mid s_t, a_t\right] &= \mathbb{E}_{\pi}\left[\mathbb{E}_{\pi}\left[G_{t+1} \mid s_{t+1}, s_t, a_t\right] \mid s_t, a_t\right] \\
 &= \mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)}\left[\mathbb{E}_{\pi}\left[G_{t+1} \mid s_{t+1}\right] \right].
\end{aligned}
$$
Applying the law of total expectation with extra conditioning on $a_{t+1}$ in the inner expectation:
$$
\begin{aligned}
\mathbb{E}_{\pi}\left[G_{t+1} \mid s_{t+1}\right] &= \mathbb{E}_{\pi}\left[\mathbb{E}_{\pi}\left[G_{t+1} \mid s_{t+1}, a_{t+1}\right] \mid s_{t+1}\right] \\
&= \mathbb{E}_{a_{t+1} \sim \pi(\cdot \mid s_{t+1})}\left[\mathbb{E}_{\pi}\left[G_{t+1} \mid s_{t+1}, a_{t+1}\right]\right] \\
&= \mathbb{E}_{a_{t+1} \sim \pi(\cdot \mid s_{t+1})}\left[Q^\pi(s_{t+1}, a_{t+1})\right].
\end{aligned}
$$
Substituting back into the original equation to get $\eqref{eq:bellman_equations_q}$:
$$
\begin{aligned}
Q^\pi(s_t, a_t) &= r(s_t, a_t) + \gamma\mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)}\left[\mathbb{E}_{\pi}\left[G_{t+1} \mid s_{t+1}\right] \right] \\
&= r(s_t, a_t) + \gamma\mathbb{E}_{s_{t+1} \sim p(\cdot \mid s_t, a_t)}\left[ \mathbb{E}_{a_{t+1} \sim \pi(\cdot \mid s_{t+1})}\left[Q^\pi(s_{t+1}, a_{t+1})\right] \right] \\
\end{aligned}
$$


</details>

### Actor-Critic Methods

REINFORCE is unbiased, but it often has high variance because it uses full sampled returns. Actor-critic methods reduce this variance by introducing a learned critic, which estimates either the state-value function $V^\pi(s)$, the action-value function $Q^\pi(s,a)$, or the advantage function $A^\pi(s,a)$. The actor updates the policy, while the critic provides a lower-variance training signal. We have the following two components in an actor-critic method:

- The **actor** is the policy $\pi_\theta(a \mid s)$
- The **critic** is a function approximator $V_\phi(s)$

In the advantage actor-critic method, we use the critic's estimate of the value function to compute an advantage estimator:
$$
\Psi_t = \hat{A}(s_t,a_t) = \hat{Q}(s_t,a_t) - V_\phi(s_t), \quad \hat{Q}(s_t,a_t) = G_t
$$
Since we cannot compute the true $Q^\pi(s_t,a_t)$, we use the Monte Carlo return $G_t$ as an unbiased estimator of $Q^\pi(s_t,a_t)$.

We can then perform the Monte Carlo policy gradient update using this advantage estimator:
$$
\begin{equation} \label{eq:actor_update_monte_carlo}
\nabla_\theta J(\theta) \approx \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t^{(i)} \mid s_t^{(i)}) \hat{A}(s_t^{(i)}, a_t^{(i)}).
\end{equation}
$$
We can now update actor parameters $\theta$ using gradient ascent:
$$
\begin{equation} \label{eq:actor_update_gradient_ascent}
\theta \leftarrow \theta + \alpha \nabla_\theta J(\theta),
\end{equation}
$$
And update critic parameters using gradient descent using the observed returns:
$$
L(\phi) = \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T \left(V_\phi(s_t^{(i)}) - G_t^{(i)}\right)^2
$$
$$
\phi \leftarrow \phi - \beta \nabla_\phi L(\phi).
$$

### Temporal Difference Learning

The Monte Carlo return $G_t$ can have high variance because it depends on the entire future trajectory. Temporal Difference (TD) learning reduces this variance by using **bootstrapping**: instead of summing rewards all the way to the end of the trajectory, we stop early and use the critic’s current estimate $V_\phi$ to approximate the remaining return.

Starting from the discounted return,
$$
\begin{equation} \label{eq:discounted_return_again}
G_t = \sum_{t'=t}^{T} \gamma^{\,t'-t} r_{t'},
\end{equation}
$$
we can split this into the first $k$ rewards and the remaining tail:
$$
\begin{equation} \label{eq:k_step_return_split}
G_t
=
\sum_{j=0}^{k-1} \gamma^j r_{t+j}
+
\gamma^k G_{t+k}.
\end{equation}
$$
Since $G_{t+k}$ is the return from time $t+k$ onward, its conditional expectation given $s_{t+k}$ is the value function $\eqref{eq:state_value_reward_to_go}$:
$$
\begin{equation} \label{eq:value_as_expected_tail}
V^\pi(s_{t+k}) = \mathbb{E}[G_{t+k} \mid s_{t+k}].
\end{equation}
$$
Replacing the unknown value function $V^\pi$ with the critic $V_\phi$, we obtain the $k$-step bootstrapped estimate of the action-value:
$$
\begin{equation} \label{eq:k_step_q_estimate}
\hat{Q}^{(k)}(s_t, a_t)
=
\sum_{j=0}^{k-1} \gamma^j r_{t+j}
+
\gamma^k V_\phi(s_{t+k}).
\end{equation}
$$

The simplest case is the **one-step** TD estimate, obtained by setting $k=1$:
$$
\begin{equation} \label{eq:one_step_q_estimate}
\hat{Q}^{(1)}(s_t, a_t)
=
r_t + \gamma V_\phi(s_{t+1}).
\end{equation}
$$
Using this one-step estimate, the corresponding advantage estimator is
$$
\begin{equation} \label{eq:one_step_advantage}
\hat{A}(s_t, a_t)
=
\hat{Q}^{(1)}(s_t, a_t) - V_\phi(s_t)
=
r_t + \gamma V_\phi(s_{t+1}) - V_\phi(s_t).
\end{equation}
$$
This quantity is called the **TD error**, and is defined as
$$
\begin{equation} \label{eq:td_error}
\delta_t = r_t + \gamma V_\phi(s_{t+1}) - V_\phi(s_t).
\end{equation}
$$

Thus, TD learning replaces the full Monte Carlo return with a bootstrapped target that depends only on a small number of future rewards, which typically gives a lower-variance estimate at the cost of introducing some bias through the critic.

### Generalized Advantage Estimation (GAE)

The $k$-step bootstrapped estimate $\hat{Q}^{(k)}$ provides a way to trade off bias and variance by choosing different values of $k$. (Higher $k$ reduces bias but increases variance, while lower $k$ increases bias but reduces variance.) Generalized Advantage Estimation (GAE) is a method that combines multiple $k$-step estimates to create a more flexible advantage estimator.
$$
\begin{align}
\hat{A}^{\mathrm{GAE}(\gamma, \lambda)}(s_t, a_t) & = \frac{1}{\sum_{l} w_l}\sum_{l} w_l \delta_{t+l}, \quad \text{where } w_l = (\gamma \lambda)^{l-1} \\
&= \sum_{l=0}^\infty (\gamma \lambda)^{l} \delta_{t+l}.
\end{align}
$$

With $\lambda=0$, GAE reduces to the one-step TD error:
$$
\hat{A}^{\mathrm{GAE}(\gamma, 0)}(s_t, a_t) = \delta_t.
$$
With $\lambda=1$, GAE reduces to the full Monte Carlo return minus the value function:
$$
\hat{A}^{\mathrm{GAE}(\gamma, 1)}(s_t, a_t) = G_t - V_\phi(s_t).
$$
By tuning $\lambda \in [0, 1]$, we can find a sweet spot that balances bias and variance for our particular problem.

### Trust Region Policy Optimization (TRPO)

Instead of collecting fresh trajectories from the current policy $\pi_\theta$ for every update, we can sometimes reuse trajectories collected from an older policy $\pi_{\theta_{\text{old}}}$. However, since these trajectories were not sampled from the current policy, we must correct for the distribution mismatch, typically using importance sampling or a surrogate objective based on the probability ratio $\pi_\theta(a_t \mid s_t) / \pi_{\theta_{\text{old}}}(a_t \mid s_t)$.

#### Surrogate Objective

Importance sampling allows us to rewrite an expectation under one distribution using samples from another.
Let $p(x)$ and $q(x)$ be PDFs such that $q(x) > 0$ whenever $p(x) > 0$. Then
$$
\begin{equation} \label{eq:importance_sampling}
\mathbb{E}_{x \sim p(\cdot)}\left[f(x)\right] = \int p(x) f(x) dx = \int q(x) \frac{p(x)}{q(x)} f(x) dx = \mathbb{E}_{x \sim q(\cdot)}\left[\frac{p(x)}{q(x)} f(x)\right].
\end{equation}
$$
The ratio 
$$
w(x) = \frac{p(x)}{q(x)}
$$
is called the **importance weight**.

Starting with policy gradient $\eqref{eq:policy_gradient_final}$, we apply importance sampling $\eqref{eq:importance_sampling}$ to rewrite the expectation under the new policy $\pi_\theta$ using samples from the old policy $\pi_{\theta_{\text{old}}}$:
$$
\begin{align}
\nabla_\theta J(\theta) &= \mathbb{E}_{\tau \sim p_\theta(\cdot)}\left[\left( \sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t) \right) R(\tau)\right] \\
&= \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[\frac{p_\theta(\tau)}{p_{\theta_{\text{old}}}(\tau)} \left(\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t)\right) R(\tau)\right].
\end{align}
$$
Follow $\eqref{eq:trajectory_probability}$, we can write the importance weight as
$$
\begin{equation} \label{eq:importance_weight_trpo}
w_\theta (\tau) = \frac{p_\theta(\tau)}{p_{\theta_{\text{old}}}(\tau)} = \prod_{t=1}^T \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)},
\end{equation}
$$
since $p(s_1)$ and $p(s_{t+1} \mid s_t, a_t)$ do not depend on $\theta$ and cancel out in the ratio. Substituting this back into the policy gradient:
$$
\begin{align}
\nabla_\theta J(\theta) &= \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[w_\theta(\tau) \left(\sum_{t=1}^T \nabla_\theta \log \pi_\theta(a_t \mid s_t)\right) R(\tau)\right] \\
&= \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[\nabla_\theta w_\theta(\tau) R(\tau)\right] \\
&= \nabla_\theta \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[w_\theta(\tau) R(\tau)\right].
\end{align}
$$
We define the gradient component above as the **surrogate objective**:
$$
\begin{equation} \label{eq:surrogate_objective_trpo}
L(\theta) = \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[\left(\prod_{t=1}^T \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}\right) R(\tau)\right].
\end{equation}
$$
Therefore, we arrive at the following identity:
$$
\begin{equation} \label{eq:policy_gradient_surrogate_objective}
\nabla_\theta J(\theta) = \nabla_\theta L(\theta).
\end{equation}
$$
Suppose we evaluate at $\theta = \theta_{\text{old}}$, then the importance weight is 1, and the surrogate objective reduces to the expected return under the old policy:
$$
\begin{equation} \label{eq:surrogate_objective_at_old_policy}
L(\theta_{\text{old}}) = \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[R(\tau)\right] = J(\theta_{\text{old}}).
\end{equation}
$$
The surrogate objective $L(\theta)$ is a first-order approximation to the true expected return $J(\theta)$ around $\theta_{\text{old}}$. Therefore, we need to ensure that the new policy $\pi_\theta$ does not deviate too much from the old policy $\pi_{\theta_{\text{old}}}$, otherwise the surrogate objective may no longer be a good approximation to the true expected return, and we may end up with a policy update that actually decreases performance.

Trusted Region Policy Optimization (TRPO) optimizes this surrogate objective while ensuring that the new policy does not deviate too much from the old policy by imposing a constraint on the KL divergence between the two policies. The **Constrained TRPO** optimization problem is:
$$
\begin{equation} \label{eq:trpo_constrained_optimization}
\begin{aligned}
\max_\theta \quad & L(\theta) \\
\text{subject to} \quad & \mathbb{E}_{s \sim d^{\pi_{\theta_{\text{old}}}}}\left[D_{\mathrm{KL}}\left(\pi_{\theta_{\text{old}}}(\cdot \mid s) \| \pi_\theta(\cdot \mid s)\right)\right] \leq \delta, 
\end{aligned}
\end{equation}
$$
where $d^{\pi_{\theta_{\text{old}}}}$ denotes the states visited by the old policy, and $\delta$ is a hyperparameter that controls how much the new policy is allowed to deviate from the old policy. 

The **Penalized TRPO** optimization problem is:
$$
\begin{equation} \label{eq:trpo_penalized_optimization}
\max_\theta \quad L(\theta) - \beta \mathbb{E}_{s \sim d^{\pi_{\theta_{\text{old}}}}}\left[D_{\mathrm{KL}}\left(\pi_{\theta_{\text{old}}}(\cdot \mid s) \| \pi_\theta(\cdot \mid s)\right)\right],
\end{equation}
$$
where $\beta > 0$ is a Lagrange multiplier that controls the strength of the penalty on KL divergence.

We can also have a strict maximum KL constraint:
$$
\begin{equation} \label{eq:trpo_strict_kl_constraint}
\begin{aligned}
\max_\theta \quad & L(\theta) \\
\text{subject to} \quad & D_{\mathrm{KL}}\left(\pi_{\theta_{\text{old}}}(\cdot \mid s) \| \pi_\theta(\cdot \mid s)\right) \leq \delta, \quad \forall s.
\end{aligned}
\end{equation}
$$
TRPO is therefore a trust-region method because it performs the optimization in a local region around the old policy as given by the KL divergence constraint. 

#### TRPO Algorithm

1. Set $\theta_{\text{old}} \leftarrow \theta$.
2. Collect a batch of trajectories using $\pi_{\theta_{\text{old}}}$.
3. Compute advantage estimates $\hat{A}_t$ with critic $V_\phi$ using GAE.
4. For each stored $(s_t, a_t)$, compute the weight ratio
    $$
    r_\theta(t) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}.
    $$
    and then form the surrogate objective
    $$
    L(\theta) = \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T r_\theta^{(i)}(t)\,\hat{A}_t^{(i)}.
    $$
5. Estimate the average KL divergence between the old and new policies over the sampled states:
    $$
    \bar D_{\mathrm{KL}}(\theta)
    =
    \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T
    D_{\mathrm{KL}}\!\left(
    \pi_{\theta_{\text{old}}}(\cdot \mid s_t^{(i)})
    \,\|\, 
    \pi_\theta(\cdot \mid s_t^{(i)})
    \right).
    $$
6. Update the actor parameters $\theta$ by maximizing the surrogate objective $L(\theta)$ subject to the trust-region constraint
    $$
    \bar D_{\mathrm{KL}}(\theta) \le \delta,
    $$
    while keeping $\theta_{\text{old}}$ fixed during this optimization.
7. In practice, compute a single trust-region update direction using the gradient of $L(\theta)$ and the local curvature of the KL divergence, then use a line search to ensure that the updated policy both improves the surrogate objective and satisfies the KL constraint.
8. Update the critic parameters $\phi$ by taking gradient descent steps on the value loss using
    $$
    \begin{aligned}
    L(\phi) &= \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T \left(V_\phi(s_t^{(i)}) - G_t^{(i)}\right)^2 \\
    \phi &\leftarrow \phi - \beta \nabla_\phi L(\phi).
    \end{aligned}
    $$
9. After finishing optimization on that batch, set
    $$
    \theta_{\text{old}} \leftarrow \theta
    $$
    and repeat the entire process until convergence.


### Proximal Policy Optimization (PPO)

TRPO enforces a hard trust region via a KL constraint. PPO instead constructs a modified first-ordered objective that implicitly discourages large policy updates while remaining simple to implement.

#### Clipped Surrogate Objective

Given the surrogate objective:
$$
L(\theta) = \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[ w_\theta(\tau) \hat{A}_\tau\right],
$$
PPO modifies this objective by clipping the importance weight $w_\theta(\tau)$ to be within a certain range around 1:
$$
\begin{equation} \label{eq:ppo_clipped_objective}
L^{\mathrm{CLIP}}(\theta) = \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[\min\left(w_\theta(\tau) \hat{A}_\tau, \operatorname{clip}(w_\theta(\tau), 1-\epsilon, 1+\epsilon) \hat{A}_\tau\right)\right].
\end{equation}
$$
where $\epsilon$ is a hyperparameter that controls how much the new policy is allowed to deviate from the old policy. The clipping function $\operatorname{clip}(x, a, b)$ limits $x$ to be within the range $[a, b]$. 

We denote a single timestep clipped surrogate objective as
$$
\ell_t(\theta) = \min\left(r_\theta(t) \hat{A}_t, \operatorname{clip}(r_\theta(t), 1-\epsilon, 1+\epsilon) \hat{A}_t\right),
$$
where $r_\theta(t)$ is defined as the importance weight at time $t$:
$$
r_\theta(t) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}.
$$

We have the following cases for the clipped surrogate objective:
| $$\hat A_t$$ | Best direction | Bad direction | Clipped side |
|---|---|---|---|
| $$\hat A_t> 0$$ | make $$r_\theta(t)$$ bigger | make $$r_\theta(t)$$ smaller | right side at $$1+\epsilon$$ |
| $$\hat A_t< 0$$ | make $$r_\theta(t)$$ smaller | make $$r_\theta(t)$$ bigger | left side at $$1-\epsilon$$ |

#### PPO Algorithm

1. Set $\theta_{\text{old}} \leftarrow \theta$.
2. Collect a batch of trajectories using $\pi_{\theta_{\text{old}}}$.
3. Compute advantage estimates $\hat{A}_t$ with critic $V_\phi$ using GAE.
4. For each stored $(s_t, a_t)$, compute the weight ratio
    $$
    r_\theta(t) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}.
    $$
    and then compute the clipped surrogate objective
    $$
    \ell_t(\theta) = \min\left(r_\theta(t) \hat{A}_t, \operatorname{clip}(r_\theta(t), 1-\epsilon, 1+\epsilon) \hat{A}_t\right).
    $$
5. Form a batch PPO objective by averaging over all sampled timesteps:
    $$
    L^{\mathrm{CLIP}}(\theta) = \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T \ell_t^{(i)}(\theta).
    $$
6. Update the actor parameters $\theta$ by taking gradient ascent steps on $L^{\mathrm{CLIP}}(\theta)$ while keeping $\theta_{\text{old}}$ fixed
    $$
    \theta \leftarrow \theta + \alpha \nabla_\theta L^{\mathrm{CLIP}}(\theta).
    $$
7. Update the critic parameters $\phi$ by taking gradient descent steps on the value loss using
    $$
    \begin{aligned}
    L(\phi) & = \frac{1}{N} \sum_{i=1}^N \sum_{t=1}^T \left(V_\phi(s_t^{(i)}) - G_t^{(i)}\right)^2 \\
    \phi &\leftarrow \phi - \beta \nabla_\phi L(\phi).
    \end{aligned}
    $$
8. Repeat actor and critic updates (step 4 - 7) for multiple epochs using the same batch of data.
9. After finishing optimization on that batch, set 
    $$
    \theta_{\text{old}} \leftarrow \theta
    $$
    and repeat the entire process until convergence.

#### KL-Based Control and Adaptive Updates

In addition to clipping, we can also add a KL-penalty variant:
$$
\begin{equation} \label{eq:ppo_kl_penalty}
L^{\text{KLPEN}}(\theta) = \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[w_\theta(\tau) \hat{A}_\tau - \beta D_{\mathrm{KL}}\left(\pi_{\theta_{\text{old}}}(\cdot \mid s) \| \pi_\theta(\cdot \mid s)\right)\right].
\end{equation}
$$
where $\beta$ is a hyperparameter that controls the strength of the KL penalty, and it can be adaptively adjusted based on how close the new policy is to the old policy. We can add this term to the clipped objective to get a combined objective:
$$
\begin{equation} \label{eq:ppo_combined_objective}
L^{\mathrm{COMBINED}}(\theta) = L^{\mathrm{CLIP}}(\theta) - \beta \mathbb{E}_{\tau \sim p_{\theta_{\text{old}}}(\cdot)}\left[D_{\mathrm{KL}}\left(\pi_{\theta_{\text{old}}}(\cdot \mid s) \| \pi_\theta(\cdot \mid s)\right)\right].
\end{equation} 
$$

### Model-Based RL

In Model-free RL, we interact with the environment and learn a policy directly from experience without explicitly modeling the environment's dynamics. We use model-based RL because it can learn good behavior with much less real data by predicting the consequences of actions.

In model-based RL, we learn a model of the environment's dynamics:
$$
s' \approx f(s, a),
$$
then use the learned model for planning or policy optimization.

**Naive model learning**

1. Collect data with a base policy.
2. Fit $f_\phi(s, a)$ with the collected data.
3. Plan through the learned model to get a new policy $\pi_\theta$.

- Pros: simple
- Cons: suffers from distribution mismatch

**Iterative Model Learning**

1. Collect data with current policy.
2. Fit $f_\phi(s, a)$ with the collected data.
3. Plan using $f_\phi(s, a)$ to get actions.
4. Execute actions and add new data to the dataset.
5. Repeat until convergence.

- Pros: keep retraining on the distribution induced by the current controller.
- Cons: long open-loop planning is fragile

**Model Predictive Control (MPC)**

1. Collect data with current policy.
2. Fit $f_\phi(s, a)$ with the collected data.
3. From current state, evalute candidate action sequences using $f_\phi(s, a)$ to predict future states and rewards.
4. Execute the first action of the best sequence, then observe the new state and add it to the dataset.
5. Repeat until convergence.

- Pros: replanning corrects small model errors before they compound.
- Cons: expensive at test time.

**Backpropagate into the policy**

1. Collect data with current policy.
2. Fit $f_\phi(s, a)$ with the collected data.
3. Backpropagate through $f_\phi(s, a)$ to optimize the policy $\pi_\theta$ directly.
4. Run $\pi_\theta$ in the environment and add new data to the dataset.
5. Repeat until convergence.

- Pros: efficient at test time.
- Cons: can be unstable if the model is inaccurate.

### Value Learning and Q-Learning

So far, we have focused on policy-based methods, which directly optimize the policy. Another class of methods are value-based methods, which learns a value function first, and then extracts a policy from it. 

We have already defined state-value function $\eqref{eq:state_value_reward_to_go}$ and action-value function $\eqref{eq:action_value_reward_to_go}$, and their bellman forms $\eqref{eq:bellman_equations}, \eqref{eq:bellman_equations_q}$.

#### Value Learning

In a finite MDP with known transition dynamics $p(s' \mid s, a)$ and reward function $r(s, a)$, we can perform the following algorithm to learn the optimal value function $V^*(s)$:

1. Initialize $V(s)$ arbitrarily for all states $s$.
2. For each state $s$, compute the Bellman backup:
    $$
    V(s) \leftarrow \max_a \left(r(s, a) + \gamma \sum_{s'} p(s' \mid s, a) V(s')\right).
    $$
3. Repeat step 2 until convergence.

Once the value function has converged, we extract the greedy policy:
$$
\pi(s) = \arg \max_a \left(r(s, a) + \gamma \sum_{s'} p(s' \mid s, a) V(s')\right).
$$

#### Fitted Value Iteration (FVI)
In large or continuous state spaces, we represent the value function with a function approximator $V_\phi(s)$:
$$
V_\phi(s) \approx V^*(s),
$$

1. Collect a dataset of states $\{s_i\}_{i=1}^N$ (using some policy or from a replay buffer).
2. Compute targets $\{y_i\}_{i=1}^N$ for each state using the Bellman optimality equation with known transition dynamics $s' = f(s, a)$:
    $$
    y_i = \max_a \left(r(s_i, a) + \gamma V_\phi(f(s_i, a))\right).
    $$
3. Fit the value function $V_\phi$ by minimizing the mean squared error between the predicted values and the targets:
    $$
    L(\phi) = \frac{1}{N} \sum_{i=1}^N \left(V_\phi(s_i) - y_i\right)^2.
    $$
4. Update the value function parameters $\phi$ using gradient descent:
    $$
    \phi \leftarrow \phi - \beta \nabla_\phi L(\phi).
    $$
5. Repeat steps 2-4 until convergence.

Once we have learned a $V_\phi(s)$, we can extract a policy by acting greedily with respect to the learned value function:
$$
\pi(s)=\arg \max _a\left(r(s, a)+\gamma V_\phi(f(s, a))\right).
$$

Limitations of FVI:
- No convergence guarantees with function approximation.
- Model-based: requires a model of the dynamics to compute targets.
- We are not directly optimizing $J(\theta) = \mathbb{E}_{\tau \sim p_\theta(\cdot)}\left[R(\tau)\right]$.

#### Q-Learning

Suppose we do not know the transition dynamics $p(s' \mid s, a)$, but we can interact with the environment and observe transitions. We can learn the action-value function $Q^\pi(s, a)$ directly:
$$
Q(s, a) \approx Q^*(s, a),
$$

1. Initialize $Q(s, a)$ arbitrarily for all states $s$ and actions $a$.
2. Observe the current state $s_t$.
3. Choose an action $a_t$ using an **exploration policy** (e.g., $\epsilon$-greedy).
4. Execute $a_t$, observe reward $r_t$ and next state $s_{t+1}$.
5. Update the Q-table using
    $$
    Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha \left(r_t + \gamma \max_{a'} Q(s_{t+1}, a') - Q(s_t, a_t)\right).
    $$
6. Set $s_t \leftarrow s_{t+1}$ and repeat steps 3-5 until convergence.

Once the Q-function has converged, we can extract the greedy policy:
$$
\pi(s) = \arg \max_a Q(s, a).
$$

Properties of Q-learning:
- Model-free: does not require $p(s' \mid s, a)$.
- Off-policy: can learn from data collected by any behavior policy.
- Converges to the optimal action-value function $Q^*(s, a)$ under certain conditions (e.g., sufficient exploration, learning rate decay).

#### Fitted Q-Iteration (FQI)

For large or continuous state spaces, we parameterize the action-value function with a function approximator $Q_\phi(s, a)$:
$$
Q_\phi(s, a) \approx Q^*(s, a).
$$

1. Initialize $Q_\phi(s, a)$ with random parameters $\phi$.
2. Collect data $\{(s_i, a_i, r_i, s_i')\}_{i=1}^N$ by interacting with the environment using some behavior policy (e.g., $\epsilon$-greedy).
3. Compute targets for each transition using the Bellman optimality equation:
    $$
    y_i = r_i + \gamma \max_{a'} Q_\phi(s_i', a').
    $$
4. Fit the action-value function $Q_\phi$ by minimizing the mean squared error between the predicted Q-values and the targets:
    $$
    L(\phi) = \frac{1}{N} \sum_{i=1}^N \left(Q_\phi(s_i, a_i) - y_i\right)^2.
    $$
5. Update the parameters $\phi$ using gradient descent:
    $$
    \phi \leftarrow \phi - \beta \nabla_\phi L(\phi).
    $$
6. Repeat steps 2-5 until convergence.
Once we have learned $Q_\phi(s, a)$, we can extract a policy by acting greedily with respect to the learned Q-function:
$$
\pi(s) = \arg \max_a Q_\phi(s, a).
$$

#### Exploration Policies

When collecting data for Q-Learning, we need a policy.

##### Epsilon-Greedy

If $a^* = \arg \max_a Q(s, a)$ is the greedy action, then
- with probability $1-\epsilon$, choose $a^*$.
- with probability $\epsilon$, choose a random action uniformly from the action space.

$\epsilon \in [0, 1]$ controls how much randomness:
- small $\epsilon$: more exploitation, less exploration.
- large $\epsilon$: more exploration, less exploitation.

##### Boltzmann Exploration

The policy is
$$
\pi(a \mid s) = \frac{\exp(Q(s, a) / \tau)}{\sum_{a'} \exp(Q(s, a') / \tau)}, \quad \tau > 0 
$$

$\tau$ is the temperature parameter that controls the randomness of the policy:
- small $\tau$: more exploitation, less exploration (the policy becomes more deterministic).
- large $\tau$: more exploration, less exploitation (the policy becomes more uniform).