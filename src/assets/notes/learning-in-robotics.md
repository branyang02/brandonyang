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
Var(X + Y) & = Var(X) + Var(Y) \quad \text{(if independent)}.
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
\begin{align}
p(x_1, \ldots, x_N) &= p(x_1) p(x_2 \mid x_1) p(x_3 \mid x_1, x_2) \cdots p(x_N \mid x_1, \ldots, x_{N-1}) \\
p(x_1, \ldots, x_N) &= \prod_{i=1}^N p(x_i \mid x_1, \ldots, x_{i-1}). \label{eq:chain_rule}
\end{align}
$$

We perform marginalization to recover the distribution of a subset of variables from a joint distribution by extending $\eqref{eq:marginal_pmf}$ to multiple variables.

For example, to find the marginal distribution of $X_1$ from the joint distribution $p(x_1, \ldots, x_N)$, we sum over all possible values of $X_2, \ldots, X_N$:
$$
\begin{equation} \label{eq:general_marginal}
p(x_1) = \sum_{x_2} \cdots \sum_{x_N} p(x_1, \ldots, x_N).
\end{equation}
$$

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
p(x \mid y, z) = p(x \mid z).
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
p_{X \mid Y}(x \mid y) = \frac{p_{Y \mid X}(y \mid x) p_X(x)}{p_Y(y)} = \eta \cdot p_{Y \mid X}(y \mid x) p_X(x).
\end{equation}
$$
Here, $\eta = \frac{1}{P(Y)}$ is a normalization constant ensuring the posterior sums to 1.

**Recursive Update ($n$ Observations)**: When receiving a sequence of observations $y_1, \ldots, y_n$, we assume observations are conditionally independent given the state $X$, i.e, $Y_i \perp Y_j \mid X$ for $i \neq j$ as shown in $\eqref{eq:conditional_independence}$. The posterior after $n$ steps uses the posterior from step $n-1$ as the new prior:
$$
\begin{equation} \label{eq:bayes_recursive}
p(x \mid y_1, \ldots, y_n) = \eta \cdot p(y_n \mid x) \cdot p(x \mid y_1, \ldots, y_{n-1}),
\end{equation}
$$
where $\eta$ is the normalization constant for the $n$-th step, given by $\eta = \frac{1}{p(y_n \mid y_1, \ldots, y_{n-1})}$.

<details><summary>Example: Recursive Bayesian Estimation (Door Sensor)</summary>

Let $X$ be the random variable for the door state and $Y$ be the random variable for the sensor reading. The realizations are $x \in \{\text{open}, \text{closed}\}$ and $y \in \{0, 1\}$, where $1$ indicates the sensor reads "Open".

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
We can compute these step by step:

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

From $\eqref{eq:bayes_recursive}$, we can expand the posterior after $n$ observations to obtain:
$$
\begin{equation} \label{eq:bayes_expanded}
p_{X \mid Y_1, \ldots, Y_n}(x \mid y_1, \ldots, y_n) = \eta \cdot p_X(x) \prod_{i=1}^{n} p_{Y_i \mid X}(y_i \mid x),
\end{equation}
$$
where
$$
\eta = \frac{1}{p_{Y_1, \ldots, Y_n}(y_1, \ldots, y_n)} = \frac{1}{\sum_{x'} \left[ p_X(x') \prod_{i=1}^n p_{Y_i \mid X}(y_i \mid x') \right]}
$$
is the normalization constant at each step. This formulation highlights how each new observation incrementally updates our belief about the state $X$.

<details><summary>Proof of Expanded Bayesian Estimation</summary>

We aim to derive the expanded posterior form $\eqref{eq:bayes_expanded}$ starting from the recursive update rule $\eqref{eq:bayes_recursive}$.

**Assumption:** The observations $Y_1, \ldots, Y_n$ are conditionally independent given the state $X$.

**Base Case ($n=1$):**
For a single observation, the recursive update $\eqref{eq:bayes_recursive}$ simplifies to the single observation update $\eqref{eq:bayes_single}$.
$$
\begin{equation} \label{eq:proof_base}
p_{X \mid Y_1}(x \mid y_1) = \eta_1 \cdot p_{Y_1 \mid X}(y_1 \mid x) p_X(x).
\end{equation}
$$
This matches the form of $\eqref{eq:bayes_expanded}$ for $n=1$.

**Inductive Step:**
Assume that the expanded form holds for $n-1$ observations (Inductive Hypothesis). That is:
$$
\begin{equation} \label{eq:proof_hypothesis}
p_{X \mid Y_1, \ldots, Y_{n-1}}(x \mid y_1, \ldots, y_{n-1}) = \eta_{1:n-1} \cdot p_X(x) \prod_{i=1}^{n-1} p_{Y_i \mid X}(y_i \mid x),
\end{equation}
$$
where $\eta_{1:n-1}$ represents the accumulated normalization constant for the sequence up to $n-1$.

Now, consider the recursive update for the $n$-th step given by $\eqref{eq:bayes_recursive}$:
$$
\begin{equation} \label{eq:proof_recursive_step}
p_{X \mid Y_1, \ldots, Y_n}(x \mid y_1, \ldots, y_n) = \eta_n \cdot p_{Y_n \mid X}(y_n \mid x) \cdot p_{X \mid Y_1, \ldots, Y_{n-1}}(x \mid y_1, \ldots, y_{n-1}).
\end{equation}
$$

Substitute the Inductive Hypothesis $\eqref{eq:proof_hypothesis}$ into the recursive equation $\eqref{eq:proof_recursive_step}$:
$$
\begin{equation} \label{eq:proof_sub}
p_{X \mid Y_1, \ldots, Y_n}(x \mid y_1, \ldots, y_n) = \eta_n \cdot p_{Y_n \mid X}(y_n \mid x) \cdot \left[ \eta_{1:n-1} \cdot p_X(x) \prod_{i=1}^{n-1} p_{Y_i \mid X}(y_i \mid x) \right].
\end{equation}
$$

We can combine the scalar normalization constants into a single constant $\eta = \eta_n \cdot \eta_{1:n-1}$.
We can also combine the likelihood term $p_{Y_n \mid X}(y_n \mid x)$ with the product term:
$$
\begin{equation} \label{eq:proof_combine}
p_{Y_n \mid X}(y_n \mid x) \cdot \prod_{i=1}^{n-1} p_{Y_i \mid X}(y_i \mid x) = \prod_{i=1}^{n} p_{Y_i \mid X}(y_i \mid x).
\end{equation}
$$

Substituting $\eqref{eq:proof_combine}$ back into $\eqref{eq:proof_sub}$, we obtain:
$$
\begin{equation} \label{eq:proof_final}
p_{X \mid Y_1, \ldots, Y_n}(x \mid y_1, \ldots, y_n) = \eta \cdot p_X(x) \prod_{i=1}^{n} p_{Y_i \mid X}(y_i \mid x).
\end{equation}
$$

This confirms that the recursive application of Bayes' rule results in the product of individual likelihoods, recovering $\eqref{eq:bayes_expanded}$.

</details>

<details><summary>Example: Expanded Bayesian Estimation</summary>

Following the previous door sensor example, we can express the posterior after three observations using the expanded batch formula $\eqref{eq:bayes_expanded}$:
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

## Markov Chains

A sequence of random variables $X_0, X_1, X_2, \ldots$ is called a Discrete-Time Markov Chain (DTMC) if it satisfies the Markov property:
$$
\begin{equation} \label{eq:markov_property}
p(x_{n+1} \mid x_n, x_{n-1}, \ldots, x_0) = p(x_{n+1} \mid x_n),
\end{equation}
$$
which states that **future state depends only on the present state, not on the sequence of events that preceded it**.

The random variables $X_n$ take values from a countable set $S$ called the state space. Each element $i \in S$ represents a distinct configuration of the system (e.g., a robot's location on a grid).

For a time-homogeneous Markov chain, the probability of transitioning from state $i$ to state $j$ is independent of time $n$. We define the one-step transition probabilities as:
$$
\begin{equation} \label{eq:transition_probabilities}
p_{ij} = p(x_{n+1} = j \mid x_n = i), \quad \forall n \geq 0, \; i, j \in S.
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
p_{ij}^{(k)} = p(x_{n+k} = j \mid x_n = i).
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

### Evolution of a Markov Chain

The probability of being in a state $j$ at time $k + 1$ can be written as the sum over all possible previous states $i$ of the probability of being in state $i$ at time $k$ multiplied by the transition probability from $i$ to $j$:
$$
\begin{equation} \label{eq:chapman_kolmogorov_step_swapped}
p(x_{k+1} = j) = \sum_{i \in S} p(x_{k+1} = j \mid x_k = i)\, p(x_k = i)
= \sum_{i \in S} p_{ij}\, p(x_k = i).
\end{equation}
$$
This summation can be expressed compactly using linear algebra. We define a column vector $\pi^{(k)}$ representing the **probability distribution over states** at time $k$:
$$
\pi^{(k)} = \begin{bmatrix} p(x_k = 1) \\ p(x_k = 2) \\ \vdots \\ p(x_k = M) \end{bmatrix},
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

Formally, a HMM is defined by the tuple $\lambda = (S, O, A, B, \pi)$, where:

1. **State Space** $S = \{s_1, \ldots, s_M\}$: The set of discrete hidden states (e.g., robot locations).
2. **Observation Space** $O = \{o_1, \ldots, o_L\}$: The set of possible observations (e.g., sensor readings).
3. **Transition Model** $A = \{a_{ij}\}$: The probability of moving from state $i$ to state $j$, consistent with $\eqref{eq:transition_probabilities}$:
    $$
    a_{ij} = p(x_{k+1} = s_j \mid x_k = s_i).
    $$
4. **Emission Model** $B = \{b_j(v)\}$: The probability of observing $v$ given state $j$:
    $$
    b_j(v) = p(y_k = v \mid x_k = s_j).
    $$
5. **Initial Distribution** $\pi = \{\pi_i\}$: The probability distribution of the starting state:
    $$
    \pi_i = p(x_1 = s_i).
    $$

The HMM relies on two fundamental independence assumptions:

1. **Markov Assumption**: The current state depends only on the previous state ($X_k \perp X_{1:k-2} \mid X_{k-1}$).
2. **Output Independence**: The current observation depends only on the current state ($Y_k \perp \{X_{\neq k}, Y_{\neq k}\} \mid X_k$).

Based on these assumptions, the **Joint Probability Distribution** of a sequence of all variables $X_1, Y_1, \ldots, X_n, Y_n$ can be first formulated by following the chain rule $\eqref{eq:chain_rule}$:
$$
p(x_{1:n}, y_{1:n}) = p(x_1) \cdot p(y_1 \mid x_1) \cdot p(x_2 \mid x_1, y_1) \cdot p(y_2 \mid x_1, y_1, x_2) \cdots
$$
Since each state $X_k$ depends only on $X_{k-1}$ (by the Markov assumption in $\eqref{eq:markov_property}$) and each observation $Y_k$ depends only on $X_k$ (by output independence), we can simplify this to obtain the compact form:
$$
\begin{equation} \label{eq:hmm_joint}
p(x_{1:n}, y_{1:n}) = p(x_1) p(y_1 \mid x_1) \prod_{k=2}^n p(x_k \mid x_{k-1}) p(y_k \mid x_k).
\end{equation}
$$

We can apply HMMs to solve several distinct inference problems in robotics.

1. **Filtering**

    Given observations up to time $k$, compute the distribution of the state at time $k$:
    $$
    \begin{equation} \label{eq:hmm_filtering_problem}
    p(x_k \mid y_{1:k}).
    \end{equation}
    $$
2. **Smoothing**

    Given observations up to time $k$, compute the distribution of the state at anytime $j < k$:
    $$
    \begin{equation} \label{eq:hmm_smoothing_problem}
    p(x_j \mid y_{1:k}) ,\quad j < k.
    \end{equation}
    $$
    In this problem, we are interested in using the entire set of observations from the past $y_{1:j}$ and the future $y_{j+1:k}$ to estimate the state at time $j$. An important thing to remember is that we are interested in solving for all $j < k$, not just the most recent state.
3. **Prediction**

    Given observations up to time $k$, compute the distribution of the state at a time $j > k$:
    $$
    \begin{equation} \label{eq:hmm_prediction_problem}
    p(x_j \mid y_{1:k}) ,\quad j > k.
    \end{equation}
    $$
4. **Decoding**:
    Find the most likely state trajectory $x_{1:k}$ that maximizes the probability:
    $$
    \begin{equation} \label{eq:hmm_decoding_problem}
    p(x_{1:k} \mid y_{1:k}).
    \end{equation}
    $$
5. **Likelihood of Observations**:
    Given the observation trajectory $y_{1:k}$, compute the probability:
    $$
    \begin{equation} \label{eq:hmm_likelihood_problem}
    p(y_{1:k}).
    \end{equation}
    $$

These problems can be solved with forward-backward algorithms, Viterbi algorithm, and other dynamic programming techniques tailored for HMMs.

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

## Bayes Filter

We wish to compute the belief distribution $\eqref{eq:belief_distribution}$ recursively. We first apply Bayes' rule $\eqref{eq:conditioned-bayes}$ to expand the posterior and take out the normalizing constant following $\eqref{eq:bayes_single}$:
$$
\begin{align}
p(x_t \mid z_{1:t}, u_{1:t}) &= \frac{p(z_t \mid x_t, z_{1:t-1}, u_{1:t})p(x_t \mid  z_{1:t-1}, u_{1:t})}{p(y \mid  z_{1:t-1}, u_{1:t})} \label{eq:bayes-filter-before-constant} \\
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
