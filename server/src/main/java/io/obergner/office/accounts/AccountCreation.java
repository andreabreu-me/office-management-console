package io.obergner.office.accounts;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.obergner.office.accounts.subaccounts.simsme.SimsmeAccountRef;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Min;
import java.io.Serializable;

public final class AccountCreation implements Serializable {

    @NotEmpty(message = "{account.validation.name.not-empty.message}")
    @JsonProperty(value = "name", required = true)
    public final String name;

    @Min(value = 1, message = "{account.validation.mmaId.positive.message}")
    @JsonProperty(value = "mmaId", required = true)
    public final long mmaId;

    @JsonProperty(value = "createdAt", required = true)
    public final long createdAt;

    @NotEmpty(message = "{account.validation.allowed_out_channels.not-empty.message}")
    @JsonProperty(value = "allowedOutChannels", required = true)
    public final String[] allowedOutChannels;

    @JsonProperty(value = "simsmeAccountRef", required = false)
    public final SimsmeAccountRef simsmeAccountRef;

    public AccountCreation(final String name,
                           final long mmaId,
                           final long createdAt,
                           final String[] allowedOutChannels) {
        this(name, mmaId, createdAt, allowedOutChannels, null);
    }

    @JsonCreator
    public AccountCreation(final @JsonProperty("name") String name,
                           final @JsonProperty("mmaId") long mmaId,
                           final @JsonProperty("createdAt") long createdAt,
                           final @JsonProperty("allowedOutChannels") String[] allowedOutChannels,
                           final @JsonProperty("simsmeAccountRef") SimsmeAccountRef simsmeAccountRef) {
        this.name = name;
        this.mmaId = mmaId;
        this.createdAt = createdAt;
        this.allowedOutChannels = allowedOutChannels;
        this.simsmeAccountRef = simsmeAccountRef;
    }

    public String allowedOutChannelsConcat() {
        final StringBuilder result = new StringBuilder();
        for (final String ch : this.allowedOutChannels) {
            result.append(ch).append(',');
        }
        if (result.length() > 0) {
            result.deleteCharAt(result.length() - 1);
        }
        return result.toString();
    }
}
